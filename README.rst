gdash - GlusterFS Dashboard
###########################

A simple webapp to show the status of GlusterFS volumes

To install,

.. code-block:: bash

    sudo pip install gdash

Create a clusters.conf file, specify atleast one host from each cluster.

Example format 

.. code-block:: cfg

    [clusters]
    cluster1 = host1, host2, host3
    cluster2 = host4, host5, host6

Run :code:`gdash` using, 

.. code-block:: bash

    sudo gdash ~/clusters.conf

Available Options
=================

.. code-block:: text

    positional arguments:
        clusters           Clusters CONF file

    optional arguments:
        -h, --help            show this help message and exit
        --port PORT, -p PORT  Port
        --cache CACHE, -c CACHE
                              Cache output in seconds
        --debug               DEBUG
        --cluster CLUSTER     Limit dashboard only for specified cluster

