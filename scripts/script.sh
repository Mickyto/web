#!/bin/sh

sudo su

apt-get update
#apt-get -y install default-jre firefox xvfb

echo 'Installing nodeJS'

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs npm


sudo ln /usr/bin/nodejs /usr/bin/node

echo 'Done'


