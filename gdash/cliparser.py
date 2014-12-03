# -*- coding: utf-8 -*-
"""
    gdash.cliparser.py

    :copyright: (c) 2014 by Aravinda VK
    :license: MIT, see LICENSE for more details.
"""

import xml.etree.cElementTree as etree
import subprocess


SIZE_SYMBOLS = ('K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y')
SIZE_UNITS = {}

for i, s in enumerate(SIZE_SYMBOLS):
    SIZE_UNITS[s] = 1 << (i+1)*10


class RemoteExecuteFailed(Exception):
    pass


class GlusterBadXmlFormat(Exception):
    pass


ParseError = etree.ParseError if hasattr(etree, 'ParseError') else SyntaxError


def execute(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
            stderr=subprocess.PIPE, env=None, close_fds=True):
    p = subprocess.Popen(cmd,
                         stdin=stdin,
                         stdout=stdout,
                         stderr=stderr,
                         env=env,
                         close_fds=close_fds)

    (out, err) = p.communicate()
    return (p.returncode, out, err)


def format_diskusage_human_readable(num):
    for s in reversed(SIZE_SYMBOLS):
        if num >= SIZE_UNITS[s]:
            value = float(num) / SIZE_UNITS[s]
            return '%.1f%s' % (value, s)

    # n is less than 1024B
    return '%.1fB' % num


def _parse_a_vol_status(volume_el):
    value = {}
    up_bricks = 0
    for b in volume_el.findall('node'):
        name = "%s:%s" % (b.find('hostname').text,
                          b.find('path').text)
        if b.find('status').text == '1':
            up_bricks += 1

        size_free = long(b.find('sizeFree').text)
        size_total = long(b.find('sizeTotal').text)

        value[name] = {
            'name': name,
            'hostUuid': b.find('peerid').text,
            'status': 'up' if b.find('status').text == '1' else 'down',
            'port': b.find('port').text,
            'pid': b.find('pid').text,
            'sizeTotal': size_total,
            'sizeFree': size_free,
            'sizeTotalStr': format_diskusage_human_readable(
                size_total),
            'sizeUsedStr': format_diskusage_human_readable(
                size_total-size_free),
            'fs': b.find('fsName').text,
            'device': b.find('device').text,
            'blockSize': int(b.find('blockSize').text),
            'mntOptions': b.find('mntOptions').text,
            'mntOptions': b.find('mntOptions').text
        }

    return up_bricks, value


def _parse_a_vol(cluster_name, volume_el):
    value = {
        'cluster': cluster_name,
        'name': volume_el.find('name').text,
        'id': volume_el.find('id').text,
        'type': volume_el.find('typeStr').text.upper().replace('-', ' '),
        'status': volume_el.find('statusStr').text,
        'num_bricks': int(volume_el.find('brickCount').text),
        'up_bricks': 0,
        'distribute': int(volume_el.find('distCount').text),
        'stripe': int(volume_el.find('stripeCount').text),
        'replica': int(volume_el.find('replicaCount').text),
        'transport': volume_el.find('transport').text,
        'bricks': [],
        'options': []
    }

    if value['transport'] == '0':
        value['transport'] = 'TCP'
    elif value['transport'] == '1':
        value['transport'] = 'RDMA'
    else:
        value['transport'] = 'TCP,RDMA'

    for b in volume_el.findall('bricks/brick'):
        value['bricks'].append({
            "name": b.find('name').text,
            "hostUuid": b.find('hostUuid').text,
            "status": "down",
            "port": 0,
            "pid": "N/A",
            "sizeTotal": 0,
            "sizeFree": 0,
            "fs": "",
            "device": "",
            "blockSize": 4096,
            "mntOptions": ""
        })

    for o in volume_el.findall('options/option'):
        value['options'].append({"name": o.find('name').text,
                                 "value": o.find('value').text})

    return value


def get_vol_info_from_host(cluster_name, host):
    cmd = ['gluster', 'volume', 'info', "--xml", "--remote-host=%s" % host]
    rc, data, err = execute(cmd)
    if not rc == 0:
        raise RemoteExecuteFailed("Remote Execution failed: %s" % err)
    tree = etree.fromstring(data)

    volumes = []
    for el in tree.findall('volInfo/volumes/volume'):
        try:
            volumes.append(_parse_a_vol(cluster_name, el))
        except (ParseError, AttributeError, ValueError) as e:
            raise GlusterBadXmlFormat(str(e))

    return volumes


def get_vol_status_from_host(cluster_name, host):
    cmd = ['gluster', 'volume', 'status', 'all', 'detail', "--xml",
           "--remote-host=%s" % host]
    rc, data, err = execute(cmd)
    if not rc == 0:
        raise RemoteExecuteFailed("Remote Execution failed: %s" % err)

    tree = etree.fromstring(data)

    volumes = {}
    for el in tree.findall('volStatus/volumes/volume'):
        try:
            up_bricks, parsed_data = _parse_a_vol_status(el)
            volumes[el.find('volName').text] = {}
            volumes[el.find('volName').text]["up_bricks"] = up_bricks
            volumes[el.find('volName').text]["bricks"] = parsed_data
        except (ParseError, AttributeError, ValueError) as e:
            raise GlusterBadXmlFormat(str(e))

    return volumes


def get_vol_info(cluster_name, hosts):
    for host in hosts:
        try:
            return get_vol_info_from_host(cluster_name, host)
        except RemoteExecuteFailed:
            continue

    return []


def get_vol_status(cluster_name, hosts):
    for host in hosts:
        try:
            return get_vol_status_from_host(cluster_name, host)
        except RemoteExecuteFailed:
            continue

    return {}


def get_volumes(cluster_name, hosts):
    # Get Volume Info
    vols = get_vol_info(cluster_name, hosts)

    # Get Volume Status
    vol_status = get_vol_status(cluster_name, hosts)

    # Iterate Volumes and update Volume Status
    for v_idx, v in enumerate(vols):
        if v["name"] in vol_status:
            vols[v_idx]['up_bricks'] = vol_status[v["name"]]['up_bricks']

        for b_idx, b in enumerate(v["bricks"]):
            if v["name"] in vol_status:
                if b["name"] in vol_status[v["name"]]["bricks"]:
                    vols[v_idx]["bricks"][b_idx].update(
                        vol_status[v["name"]]["bricks"][b["name"]])

    # Return Volumes
    return vols


def parse(clusters):
    volumes = []
    for cluster_name, hosts in clusters.iteritems():
        volumes += get_volumes(cluster_name, hosts)

    return volumes


if __name__ == "__main__":
    clusters = {
        "cluster1": ["localhost"],
        "cluster2": ["fedoravm1"]
    }
    print parse(clusters)
