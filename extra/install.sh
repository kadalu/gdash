#!/bin/bash

curl -fsSL https://github.com/kadalu/gdash/releases/latest/download/gdash-`uname -m | sed 's|aarch64|arm64|' | sed 's|x86_64|amd64|'` -o /tmp/gdash
curl -fsSL https://github.com/kadalu/gdash/releases/latest/download/gdash.service -o /tmp/gdash.service
curl -fsSL https://github.com/kadalu/gdash/releases/latest/download/gdash-data.tar.gz -o /tmp/gdash-data.tar.gz

cd /tmp
tar xvzf gdash-data.tar.gz
cd -

install -D -m 700 /tmp/public /opt/gdash/public
install -D -m 700 /tmp/views /opt/gdash/views
install -m 700 /tmp/gdash.service /lib/systemd/system/
install /tmp/gdash /opt/gdash/gdash
ln -s /opt/gdash/gdash /usr/sbin/gdash
