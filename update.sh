if [[ ! -d "/root/texas-showdown" ]]
then
    echo "Directory /root/texas-showdown does not exist."
    echo "Please clone the project and run the install script before running this script."
    exit
fi

echo "Please enter the domain name for the server (example: example.com):"
read hostName

cd /root/personal-site/
rm -rf /usr/share/nginx/$hostName/html/*
cp -r * /usr/share/nginx/$hostName/html/

systemctl restart nginx
