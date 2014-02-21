#!/bin/bash

# install node dependencies
sudo npm install

# bootstrap the database if it doesn't exist
[ ! -f node_modules/workshop-server/data/restaurants.db ] && ./reset.sh

# startup the node server
node node_modules/workshop-server/main --port 9000 -d ./webapp

# startup the server in secure mode
# node node_modules/workshop-server/main --port 9000 -s -d ./webapp
