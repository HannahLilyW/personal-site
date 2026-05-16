#!/bin/bash
set -e

echo "Please enter the domain name for the server (example: example.com):"
read hostName

sudo cp -rf * /usr/share/nginx/$hostName/html/
