if [[ ! -d "/root/personal-site" ]]
then
    echo "Directory /root/personal-site does not exist."
    echo "Please run cd /root && git clone https://github.com/HannahLilyW/personal-site.git before running this script."
    exit
fi

dnf -y install epel-release
dnf -y install certbot
dnf -y install nginx
dnf -y install python3-certbot-nginx

echo "Please enter the domain name for the server (example: example.com):"
read hostName

mkdir -p /usr/share/nginx/$hostName/html
cd /root/personal-site/
cp -r * /usr/share/nginx/$hostName/html/
chown -R nginx:nginx /usr/share/nginx/$hostName/html

echo "Writing to /etc/nginx/conf.d/$hostName.conf..."

cat > /etc/nginx/conf.d/$hostName.conf << EOF
server {
    listen 80;

    root /usr/share/nginx/$hostName/html;
    index index.html index.htm index.nginx-debian.html;

    server_name $hostName www.$hostName;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

certbot --nginx -d $hostName

systemctl daemon-reload
systemctl enable nginx
systemctl restart nginx
