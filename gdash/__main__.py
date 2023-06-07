"""
gdash - GlusterFS Dashboard
"""
import hashlib
import os
from argparse import ArgumentParser

import cherrypy
from glustercli.cli import peer, set_gluster_path, volume

from gdash.version import VERSION

ARGS = None
USERS = None

conf = {
    "/api": {
        "tools.response_headers.on": True,
        "tools.response_headers.headers": [("Content-Type", "application/json")],
        "tools.caching.on": True,
        "tools.caching.delay": 5,
    },
    "/": {
        "tools.staticdir.on": True,
        "tools.sessions.on": True,
        "tools.staticdir.dir": os.path.join(
            os.path.dirname(os.path.abspath(__file__)), "ui"
        ),
    },
}


def is_valid_admin_login(username, password):
    if USERS is None:
        return True

    pwd_hash = USERS.get(username, None)
    if pwd_hash is None:
        return False

    pwd_hash_2 = hashlib.sha256()
    pwd_hash_2.update(password.encode())

    return pwd_hash_2.hexdigest() == pwd_hash


def is_admin():
    if USERS is None:
        return True

    return "admin" == cherrypy.session.get("role", "")


def forbidden():
    cherrypy.response.status = 403
    return {"error": "Forbidden"}


@cherrypy.tools.json_in()
@cherrypy.tools.json_out()
class GdashApis:
    @cherrypy.expose
    def login(self):
        if is_admin():
            return {}

        if cherrypy.request.method == "POST":
            data = cherrypy.request.json
            if is_valid_admin_login(data["username"], data["password"]):
                cherrypy.session["role"] = "admin"
                cherrypy.session["username"] = data["username"]
                return {}

        return forbidden()

    @cherrypy.expose
    def logout(self):
        if not is_admin():
            return {}

        if cherrypy.session.get("role", None) is not None:
            del cherrypy.session["role"]

        if cherrypy.session.get("username", None) is not None:
            del cherrypy.session["username"]

        return {}

    @cherrypy.expose
    def volumes(self):
        if not is_admin():
            return forbidden()

        return volume.status_detail(group_subvols=True)

    @cherrypy.expose
    def peers(self):
        if not is_admin():
            return forbidden()

        peers = peer.pool()
        for entry in peers:
            if entry["hostname"] == "localhost":
                entry["hostname"] = ARGS.host

        return peers


class GdashWeb:
    def __init__(self):
        self.api = None

    def default_render(self):
        filepath = os.path.dirname(os.path.abspath(__file__)) + "/ui/index.html"
        with open(filepath, encoding="utf-8") as index_file:
            return index_file.read()

    @cherrypy.expose
    def index(self):
        return self.default_render()

    @cherrypy.expose
    def volumes(self, volume_id=None):
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

    @cherrypy.expose
    def login(self):
        return self.default_render()

    @cherrypy.expose
    def logout(self):
        return self.default_render()


def get_args():
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("--version", action="version", version="%(prog)s " + VERSION)
    parser.add_argument("--port", type=int, default=8080, help="Gdash Port")
    parser.add_argument(
        "host",
        help=(
            "Hostname of Current node as used in Gluster "
            'peer commands. Gdash replaces the "localhost" '
            "references with this name"
        ),
    )
    parser.add_argument("--gluster-binary", default="gluster")
    parser.add_argument(
        "--auth-file",
        help=(
            "Users Credentials file. One user entry per row "
            "in the format <username>=<password_hash>"
        ),
    )
    parser.add_argument(
        "--ssl-cert", default=None, help=("Path to SSL Certificate used by Gdash")
    )
    parser.add_argument(
        "--ssl-key", default=None, help=("Path to SSL Key used by Gdash")
    )
    parser.add_argument(
        "--ssl-ca", default=None, help=("Path to SSL CA Certificate used by Gdash")
    )
    parser.add_argument(
        "--ssl-ciphers", default=None, help=("List of SSL Ciphers to allow")
    )

    return parser.parse_args()


def main():
    global ARGS, USERS

    ARGS = get_args()

    if ARGS.auth_file is not None:
        USERS = {}
        with open(ARGS.auth_file, encoding="utf-8") as usersf:
            for line in usersf:
                line = line.strip()
                if line:
                    username, password_hash = line.split("=")
                    USERS[username] = password_hash

    set_gluster_path(ARGS.gluster_binary)

    cherrypy_cfg = {"server.socket_host": "0.0.0.0", "server.socket_port": ARGS.port}

    if ARGS.ssl_cert:
        cherrypy_cfg["server.ssl_certificate"] = ARGS.ssl_cert

    if ARGS.ssl_key:
        cherrypy_cfg["server.ssl_private_key"] = ARGS.ssl_key

    if ARGS.ssl_ca:
        cherrypy_cfg["server.ssl_certificate_chain"] = ARGS.ssl_ca

    if ARGS.ssl_ciphers:
        cherrypy_cfg["server.ssl_ciphers"] = ARGS.ssl_ciphers

    if ARGS.ssl_cert and ARGS.ssl_key:
        cherrypy_cfg["server.ssl_module"] = "builtin"

    cherrypy.config.update(cherrypy_cfg)
    webapp = GdashWeb()
    webapp.api = GdashApis()
    cherrypy.quickstart(webapp, "/", conf)


if __name__ == "__main__":
    main()
