# gdash - GlusterFS Dashboard

## Install

```
sudo pip3 install gdash
```

## Usage

Start `gdash` service in any one of the Gluster server node.

```
sudo gdash <HOSTNAME>
```

Provide the hostname to identify where gdash is running. Use the same hostname or IP which is used with Gluster Peer/Volume commands. Gdash will use this to replace the mention of "localhost" in the peer commands.

Protect the dashboard access from others by setting the username and password.

Generate One way hash of Password

```
$ echo -n "MySecret@01" | sha256sum
1ae946b331052b646ca7d0857dfb205835b2a00a33a35e40b4419a5e150213f3  -
```

Add that to a file(`/etc/glusterfs/gdash.dat`) in the following format,

```
admin=1ae946b331052b646ca7d0857dfb205835b2a00a33a35e40b4419a5e150213f3
aravinda=9e56d42f4be084e5e56c9c23c3917ae10611678743b7f7ca0f6d65c4dd413408
```

Then run gdash using,

```
sudo gdash node1.example.com --auth-file=/etc/glusterfs/gdash.dat
```

Now you can visit http://localhost:8080 (or <node-ip>:8080 if accessing gdash externally) from your browser.

**Note**: Port can be customized by providing `--port` option(For example, `--port 3000`)

Other available options are

```
$ gdash --help
usage: gdash [-h] [--version] [--port PORT] [--gluster-binary GLUSTER_BINARY]
             [--auth-file AUTH_FILE] [--ssl-cert CERT_FILE] [--ssl-key KEY_FILE] [--ssl-ca CA_CERT_FILE]
             host

gdash - GlusterFS Dashboard

positional arguments:
  host                  Hostname of Current node as used in Gluster peer
                        commands. Gdash replaces the "localhost" references
                        with this name

optional arguments:
  -h, --help                       show this help message and exit
  --version                        show program's version number and exit
  --port PORT                      Gdash Port(Default is 8080)
  --gluster-binary GLUSTER_BINARY  Gluster binary path.
  --auth-file AUTH_FILE            Users Credentials file. One user
                                   entry per row in the
                                   format <username>=<password_hash>
  --ssl-cert CERT_FILE             Path to SSL Certificate file
  --ssl-key KEY_FILE               Path to SSL Key file
  --ssl-ca CA_FILE                 Path to SSL CA Certificate file
```

## Blog

* [Dec 04, 2014] http://aravindavk.in/blog/introducing-gdash (Previous version, UI is different now)
* [Oct 19, 2020] https://kadalu.io/blog/gdash-v1.0


## Issues

For feature requests, issues, suggestions [here](https://github.com/kadalu/gdash/issues)
