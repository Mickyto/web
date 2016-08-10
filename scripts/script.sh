#!/bin/sh

sudo su

apt-get update

echo 'Installing node.js and npm'

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install -y nodejs npm

echo 'Launching node.js server on background'

cp /vagrant/scripts/nodeup.conf /etc/init/nodeup.conf

echo 'Installing dependencies'

cd /vagrant
npm install
npm install -g nodemon

ln /usr/bin/nodejs /usr/bin/node

echo 'Done'

