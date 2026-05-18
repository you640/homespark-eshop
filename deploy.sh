#!/bin/bash
# automated deploy script for Tapfast VPS (stahovanie.website)
set -e

echo "🚀 Naštartovanie nasadenia e-shopu Homespark a WordPress..."

# 1. Zostavenie a spustenie produkčných kontajnerov v Docker Compose
echo "📦 Zostavovanie a spúšťanie Docker kontajnerov..."
docker compose -f docker-compose.prod.yml up -d --build

# 2. Čakanie na inicializáciu databázy
echo "⏳ Čakám na inicializáciu a zdravie databázy..."
sleep 5

# 3. Informácie pre prvú inštaláciu WordPress
echo "--------------------------------------------------------"
echo "✅ Kontajnery úspešne naštartovali!"
echo "--------------------------------------------------------"
echo "Prístupové porty:"
echo "- React Frontend a WordPress REST API bežia na porte 80/443 (Nginx Reverse Proxy)"
echo ""
echo "👉 Ak spúšťate WordPress prvýkrát, vykonajte túto automatickú inštaláciu:"
echo "docker compose -f docker-compose.prod.yml --profile tools run --rm wpcli sh -lc 'until wp core is-installed --allow-root || wp db check --allow-root; do sleep 2; done; wp core install --allow-root --url=http://stahovanie.website --title=\"Homespark Blog\" --admin_user=admin --admin_password=admin123 --admin_email=admin@stahovanie.website --skip-email || wp core update-db --allow-root; wp rewrite structure \"/%postname%/\" --allow-root'"
echo ""
echo "👉 Pre automatické vygenerovanie SSL Let's Encrypt certifikátov cez Certbot na VPS:"
echo "sudo apt update && sudo apt install -y certbot"
echo "sudo certbot certonly --webroot -w ./var/www/certbot -d stahovanie.website -d www.stahovanie.website"
echo "*(Po úspešnom vygenerovaní odkomentujte sekciu SSL v reverse-proxy.conf a reštartujte proxy: docker compose -f docker-compose.prod.yml restart reverse-proxy)*"
echo "--------------------------------------------------------"
