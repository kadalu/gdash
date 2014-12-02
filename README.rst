GlusterFS Dashboard
###################

A simple webapp to show the status of GlusterFS volumes

To install,

.. code-block: bash

    git clone 
    cd glusterdash
    sudo python setup.py install

Create a clusters.json file, example format 

.. code-block: json

    {
        "cluster1": [host1, host2, host3],
        "cluster2": [host4, host5, host6]
    }

Run ``glusterdash`` using, 

.. code-block: bash

    sudo glusterdash ~/clusters.json

Available Options
-----------------

--port, -p Port in which app will run
--cache, -c Time in seconds, default is 5. If page refreshed twice or page requested by multiple clients, Caches data instead of executing gluster commands multiple times.

.. code-block: bash

   sudo glusterdash ~/clusters.json -p 8000 -c 2
