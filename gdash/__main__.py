from argparse import ArgumentParser
import os
import time
import hashlib

import cherrypy

# from glustercli.cli import volume, peer

args = None
users = None

conf = {
    '/api': {
        'tools.response_headers.on': True,
        'tools.response_headers.headers': [
            ('Content-Type', 'application/json')
        ],
        'tools.caching.on': True,
        'tools.caching.delay': 5
    },
    '/': {
        'tools.staticdir.on': True,
        'tools.sessions.on': True,
        'tools.staticdir.dir': os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
            'ui/build'
        )
    }
}

def is_valid_admin_login(username, password):
    if users is None:
        return True

    pwd_hash = users.get(username, None)
    if pwd_hash is None:
        return False

    pwd_hash_2 = hashlib.sha256()
    pwd_hash_2.update(password.encode())

    return pwd_hash_2.hexdigest() == pwd_hash


def is_admin():
    if users is None:
        return True

    return 'admin' == cherrypy.session.get('role', '')


def forbidden():
    cherrypy.response.status = 403
    return {
        "error": "Forbidden"
    }


@cherrypy.tools.json_in()
@cherrypy.tools.json_out()
class GdashApis(object):
    @cherrypy.expose
    def login(self):
        if users is None:
            return {}

        data = cherrypy.request.json
        if is_valid_admin_login(data['username'], data['password']):
            cherrypy.session['role'] = 'admin'
            cherrypy.session['username'] = data['username']
            return {}

        return forbidden()

    @cherrypy.expose
    def volumes(self):
        if not is_admin():
            return forbidden()

        import json
        with open("./sample_volumes.json") as f:
            return json.load(f)
        #return volume.status_detail(group_subvols=True)

    @cherrypy.expose
    def peers(self):
        if not is_admin():
            return forbidden()

        peers = [{"uuid": "769fda2b-8dca-418f-97b1-867bad5b62ea", "hostname": "localhost", "connected": "Connected"}]
        # peers = peer.pool()
        for peer in peers:
            if peer["hostname"] == 'localhost':
                peer["hostname"] = args.host

        return peers


class GdashWeb:
    def default_render(self):
        filepath = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/ui/build/index.html'
        with open(filepath) as index_file:
            return index_file.read()

    @cherrypy.expose
    def index(self):
        return self.default_render()

    @cherrypy.expose
    def volumes(self):
        return self.default_render()

    @cherrypy.expose
    def peers(self):
        return self.default_render()

    @cherrypy.expose
    def bricks(self):
        return self.default_render()

    @cherrypy.expose
    def dashboard(self):
        return self.default_render()


def get_args():
    parser = ArgumentParser()
    parser.add_argument(
        '--port',
        type=int,
        default=8080,
        help='Gdash Port'
    )
    parser.add_argument(
        '--host',
        help=('Hostname of Current node as used in Gluster '
              'peer commands. Gdash replaces the "localhost" '
              'references with this name')
    )
    parser.add_argument('--gluster-binary', default='gluster')
    parser.add_argument(
        '--users-file',
        help=('Users Credentials file. One user entry per row '
              'in the format <username>=<password_hash>')
    )

    return parser.parse_args()


if __name__ == '__main__':
    args = get_args()

    if args.users_file is not None:
        users = {}
        with open(args.users_file) as usersf:
            for line in usersf:
                line = line.strip()
                if line:
                    username, password_hash = line.split('=')
                    users[username] = password_hash

    cherrypy.config.update({'server.socket_port': args.port})
    webapp = GdashWeb()
    webapp.api = GdashApis()
    cherrypy.quickstart(webapp, '/', conf)