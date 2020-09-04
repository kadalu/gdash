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

## Blog

* http://aravindavk.in/blog/introducing-gdash


## Issues

For feature requests, issues, suggestions [here](https://github.com/aravindavk/gdash/issues)
