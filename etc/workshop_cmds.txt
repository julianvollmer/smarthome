# Installation
## Eindeutigen Netzwerknamen vergeben und Dateisystem vergroessern
sudo raspi-config

## System aktualisieren und Packete nachinstallieren
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install npm libavahi-compat-libdnssd-dev -y

## Benötigte Bibliotheken herunterladen
mkdir workspace 
cd workspace/
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
git clone https://github.com/KhaosT/HAP-NodeJS 
git clone https://github.com/julianvollmer/smarthome
wget http://torsten-traenkner.de/wissen/smarthome/librf24-bcm.tgz
wget http://torsten-traenkner.de/wissen/smarthome/openmilight_raspberry_pi.tgz

## Bibliotheken entpacken
tar xzvf openmilight_raspberry_pi.tgz
tar xzvf librf24-bcm.tgz

## Bibliotheken installieren
cd Raspberry/librf24-bcm
sed -i 's|BCM2835_PERI_BASE=0x.*|BCM2835_PERI_BASE=0x3F000000|g' Makefile
make
sudo make install
cd ~/workspace
tar xzvf openmilight_raspberry_pi.tgz
cd openmilight/
cp ~/workspace/smarthome/etc/openmili.cpp ~/workspace/openmilight/
g++ -Ofast -mfpu=vfp -mfloat-abi=hard -march=armv7-a -mtune=arm1176jzf-s -I/usr/local/include -L/usr/local/lib -lrf24-bcm PL1167_nRF24.cpp MiLightRadio.cpp openmili.cpp -o openmilight
sudo cp ~/workspace/openmilight/openmilight /usr/local/bin/

## HAP-NodeJS Testgeräte entfernen
rm ~/workspace/HAP-NodeJS/accessories/Light_accessory.js
rm ~/workspace/HAP-NodeJS/accessories/Lock_accessory.js
rm ~/workspace/HAP-NodeJS/accessories/Thermostat_accessory.js
rm ~/workspace/HAP-NodeJS/accessories/TemperatureSensor_accessory.js
rm ~/workspace/HAP-NodeJS/accessories/GarageDoorOpener_accessory.js
rm ~/workspace/HAP-NodeJS/accessories/Fan_accessory.js

## Neue Geräte einsetzen
cp ~/workspace/smarthome/etc/*.js ~/workspace/HAP-NodeJS/accessories/
cp ~/workspace/smarthome/etc/package.json ~/workspace/HAP-NodeJS/

## Einmal ausloggen, damit nvm bekannt ist! Danach Einloggen und Bibliotheken installlieren
exit
nvm install stable
sudo npm install npm -g
cd ~/workspace/HAP-NodeJS/
sudo npm install
cd ~/workspace/smarthome/
npm install