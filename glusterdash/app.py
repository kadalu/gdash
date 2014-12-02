# -*- coding: utf-8 -*-
"""
    glusterdash.main.py

    :copyright: (c) 2014 by Aravinda VK
    :license: MIT, see LICENSE for more details.
"""

from flask import Flask, render_template, Response
import json
import ConfigParser
from argparse import ArgumentParser, RawDescriptionHelpFormatter
from flask.ext.cache import Cache

from glusterdash.cliparser import parse


PROG_DESCRIPTION = """
GlusterFS dashboard
-------------------

This tool is based on remote execution support provided by
GlusterFS cli for `volume info` and `volume status` commands
"""

app = Flask(__name__, template_folder="dist", static_folder="dist/assets")
app.debug = False
args = None
app.config['CACHE_TYPE'] = 'simple'
app.cache = Cache(app)
config = ConfigParser.RawConfigParser()


def _get_args():
    parser = ArgumentParser(formatter_class=RawDescriptionHelpFormatter,
                            description=PROG_DESCRIPTION)
    parser.add_argument('clusters', help="Clusters CONF file", type=str)
    parser.add_argument('--port', help="Port", type=int, default=8080)
    parser.add_argument('--cache', help="Cache output in seconds",
                        type=int, default=5)
    parser.add_argument('--debug', help="DEBUG", action="store_true")

    return parser.parse_args()


@app.route("/")
def dashboard():
    return render_template("index.html")


@app.route("/data")
def get_data():
    cached = app.cache.get('data')
    if cached:
        result = cached
    else:
        config.read(args.clusters)
        clusters = {}
        for name, value in config.items("clusters"):
            clusters[name] = [x.strip() for x in value.split(",")]

        result = json.dumps(parse(clusters))
        app.cache.set('data', result, timeout=args.cache)

    return Response(result, content_type='application/json; charset=utf-8')


@app.route("/api/data.json")
def api():
    return Response(open("fixtures/data.json").read(),
                    content_type='application/json; charset=utf-8')


def main():
    global args
    args = _get_args()
    app.debug = args.debug
    app.run(host='0.0.0.0', port=args.port)


if __name__ == "__main__":
    main()
