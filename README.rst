gdash - GlusterFS Dashboard
###########################
gdash is a super-young project, which shows gluster volume informations from local, remote clusters. This app is based on gluster's capability of executing :code:`gluster volume info` and :code:`gluster volume status` commands for a remote server using ``--remote-host`` option.
 
If you can run :code:`gluster volume info --remote-host=<HOST_NAME>`, then you can monitor that cluster using gdash. Make sure you allow to access glusterd port(24007) for the machine where you will run gdash.

To install,

.. code-block:: bash

    sudo pip install gdash

Usage
=====
Usecase 1 - Local Volumes
-------------------------
Just run :code:`sudo gdash`, gdash starts running in port 8080. visit http://localhost:8080 to view gluster volumes of local machine.

Usecase 2 - Remote Volumes
--------------------------
Run :code:`sudo gdash --host 192.168.1.6`, visit http://localhost:8080 to view gluster volume information of remote host. Dashboard shows all the volumes which are part of that remote host.

Usecase 3 - Multiple clusters
-----------------------------
Create a clusters.conf file as example shown below, specify atleast one host from each cluster.

.. code-block:: cfg

    [clusters]
    cluster1 = host1, host2, host3
    cluster2 = host4, host5, host6

Run :code:`gdash` using, 

.. code-block:: bash

    sudo gdash --clusters ~/clusters.conf

Usecase 4 - Multiple teams
--------------------------
If two teams monitoring two clusters and if you don't want to share the other cluster details then, just run below commands in two terminals and give respective URL to each team. Other solution is create two seperate config files and run it seperately for different ports.

.. code-block:: bash

   # Team 1, who monitors cluster1 http://localhost:8001
   sudo gdash -p 8001 --clusters ~/clusters.conf --limit-cluster cluster1

   # Team 2, who monitors cluster2 http://localhost:8002
   sudo gdash -p 8002 --clusters ~/clusters.conf --limit-cluster cluster2


Available Options
=================

.. code-block:: text

    usage: gdash [-h] [--port PORT] [--cache CACHE] [--debug] [--host HOST]
                 [--clusters CLUSTERS] [--limit-cluster LIMIT_CLUSTER]
     
    GlusterFS dashboard
    -------------------
     
    This tool is based on remote execution support provided by
    GlusterFS cli for `volume info` and `volume status` commands
     
    optional arguments:
      -h, --help            show this help message and exit
      --port PORT, -p PORT  Port
      --cache CACHE, -c CACHE
                            Cache output in seconds
      --debug               DEBUG
      --host HOST           Remote host which is part of cluster
      --clusters CLUSTERS   Clusters CONF file
      --limit-cluster LIMIT_CLUSTER
                            Limit dashboard only for specified cluster


Technical details
=================
Python, Python Flask, emberjs, ember-cli


Blog
====
http://aravindavk.in/blog/introducing-gdash


Issues
======
For feature requests, issues, suggestions `here <https://github.com/aravindavk/gdash/issues>`__
