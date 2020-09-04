import React from 'react';

export function brickStatus(volume, brick) {
    let cls = 'inline-block px-2 py-1 text-sm rounded-lg ';
    let sts = 'down';
    if (volume.status !== 'Started') {
        cls += 'bg-gray-300'
    } else if (brick.online === true) {
        cls += 'bg-green-500 text-white';
        sts = 'up';
    } else {
        cls += 'bg-red-500 text-white';
    }
    return (
        <span className={cls}>{sts}</span>
    );
}

export function volumeStatus(volume) {
    let cls = 'inline-block px-2 py-1 text-sm rounded-lg '
    if (volume.status === 'Started') {
        if (volume.health === 'up') {
            cls += 'bg-green-500 text-white'
        } else if (volume.health === 'partial') {
            cls += 'bg-yellow-500'
        } else if (volume.health === 'down') {
            cls += 'bg-red-500 text-white'
        } else {
            cls += 'bg-orange-500 text-white'
        }
    } else if (volume.status === 'Created') {
        cls += 'bg-gray-300'
    } else {
        cls += 'bg-gray-400'
    }
    return (
        <span className={cls}>
            {volume.status}{volume.health === undefined ? '' : ', ' + volume.health}
        </span>
    )
}

export function capitalize(string) {
    let parts = string.split('_');
    return parts.map(p => {
        return p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
    }).join(' ');
}

export function utilization(used, total, suffix) {
    let sizeP = used * 100 / total;

    let cls = "h-1 "
    if (sizeP > 90) {
        cls += "bg-red-500"
    } else if (sizeP > 80) {
        cls += "bg-orange-500"
    } else {
        cls += "bg-green-500"
    }

    return (
        <div className="text-sm">
            <div>{sizeP.toFixed(2)}%</div>
            <div className="bg-gray-300 mb-1 w-3/4">
                <div style={{width: sizeP.toFixed(2) + "%"}} className={cls}></div>
            </div>
            <div className="text-gray-700">{humanReadable(used, suffix)} / {humanReadable(total, suffix)}</div>
        </div>
    );
}

export function sizeUtilization(volume) {
    if (volume.status !== undefined && volume.status !== 'Started') {
        return <>N/A</>
    }

    if (volume.online !== undefined && volume.online !== true) {
        return <>N/A</>
    }

    return utilization(volume.size_used, volume.size_total, 'B');
}

export function inodesUtilization(volume) {
    if (volume.status !== undefined && volume.status !== 'Started') {
        return <>N/A</>
    }

    if (volume.online !== undefined && volume.online !== true) {
        return <>N/A</>
    }

    return utilization(volume.inodes_used, volume.inodes_total, '');
}

export function humanReadable(input_size, suffix) {
    let kib = 1024
    let mib = 1024 * kib
    let gib = 1024 * mib
    let tib = 1024 * gib
    let pib = 1024 * tib
    let eib = 1024 * pib
    let zib = 1024 * eib
    let yib = 1024 * zib

    if (input_size < 1024) {
        return input_size;
    } else {
        if (input_size < mib) {
            return (input_size/kib).toFixed(2) + " Ki" + suffix;
        } else if (input_size < gib) {
            return (input_size/mib).toFixed(2) + " Mi" + suffix;
        } else if (input_size < tib) {
            return (input_size/gib).toFixed(2) + " Gi" + suffix;
        } else if (input_size < pib) {
            return (input_size/tib).toFixed(2) + " Ti" + suffix;
        } else if (input_size < eib) {
            return (input_size/pib).toFixed(2) + " Pi" + suffix;
        } else if (input_size < zib) {
            return (input_size/eib).toFixed(2) + " Ei" + suffix;
        } else if (input_size < yib) {
            return (input_size/zib).toFixed(2) + " Zi" + suffix;
        } else {
            return (input_size/yib).toFixed(2) + " Yi" + suffix;
        }
    }
}
