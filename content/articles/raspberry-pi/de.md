---
title: "Raspberry PI"
slug: raspberry-pi-als-server
date: 2014-09-20
description: "Einrichtung eines Raspberry PI als Server."
---

Den Raspberry PI als Server installieren und konfigurieren.

## Installation der SD-Karte

Unter Ubuntu muss die SD-Karte ausgehängt werden, bevor das Image kopiert wird:

```bash
# Namen der SD-Karte ermitteln
df -h
# SD-Karte aushängen
umount /dev/sdb1
# Raspbian-Image auf die SD-Karte kopieren
dd bs=4M if=YYYY-MM-DD-wheezy-raspbian.img of=/dev/sdb
```

> Zu den möglichen Problemen: Zeigt der Raspberry einen schwarzen Bildschirm, in der Datei **config.txt** auf der SD-Karte folgende Zeile hinzufügen:

```ini
#help to boot
boot_delay=1
```

> HD-Auflösung mit einem Raspberry Pi 2 und Wheezy:

```ini
hdmi_drive=2
hdmi_group=1
hdmi_mode=31
```

> Die übrigen Optionen sind in der Konfigurationsdatei der SD-Karte beschrieben.

## Konfiguration

Das Konfigurationsfenster startet beim ersten Booten automatisch, lässt sich aber auch erneut aufrufen, indem man in der Konsole folgenden Befehl eingibt:

```bash
sudo raspi-config
```

## Eine externe Festplatte einbinden

Um mehr Speicherplatz zu haben und auch um die Lebensdauer der SD-Karte zu schonen, richtet man den Speicher besser auf einer externen Festplatte ein.

> Vorab: die Partitionen der neuen Festplatte mit einem Werkzeug einrichten (unter Ubuntu zum Beispiel mit **gparted**):
>
> - eine Partition für das **home**
> - eine Partition für die Daten

Nachdem die Festplatte am Raspberry PI angeschlossen ist, muss man

```bash
# Namen der Festplatte ermitteln
df -h
# Festplatte einhängen (sdb1 durch den gefundenen Namen ersetzen)
mount /dev/sdb1 /media/data
```

Um die SD-Karte zu schonen, kopiere ich außerdem das komplette **home** auf die Partition der Festplatte

```bash
# home auf eine /home-Partition der externen Festplatte verschieben
cd /mnt
sudo mkdir new_home/
sudo mount /dev/sda1 /mnt/new_home
sudo cp -a /home/. /mnt/new_home/
```

Zum Schluss in die Partitionstabelle des Raspberry PI eintragen,

```bash
sudo vi /etc/fstab
```

Folgende Zeilen:

```
# neues home
/dev/sdb1       /home           ext4    defaults        0       2
# Datenpartition
/dev/sdb2       /media/data     ext4    defaults        0       2
```

## Einstellung des **hostname**

Der Name, unter dem der Raspberry PI im Netzwerk erscheint, lässt sich im Konfigurationsfenster (sudo raspi-config) festlegen, man kann ihn aber auch von Hand in der Datei **hosts** bearbeiten:

```bash
sudo vi /etc/hosts
```

Folgende Zeilen hinzufügen:

```
127.0.0.1 localhost
127.0.0.1 rechnername
```

## Benutzerverwaltung

Um dem Raspberry PI einen Benutzer hinzuzufügen:

```bash
sudo adduser username
```

> Damit der neue Benutzer dieselben Rechte wie der Standardbenutzer **pi** hat:

```bash
sudo visudo
```

Und folgende Zeile hinzufügen:

```
username ALL=(ALL) NOPASSWD: ALL
```

Danach **Strg+O**, **Enter**, **Strg+X** drücken.

## Installation nützlicher Pakete für den Server

Aktualisierung der Pakete:

```bash
sudo apt-get update
sudo apt-get upgrade
```

Installation von Samba:

```bash
sudo apt-get install samba samba-common-bin
```

Installation von Lighttpd (leichte und einfache Alternative zu einem Apache-Server):

```bash
sudo apt-get install lighttpd
```

Installation von ssh:

```bash
sudo apt-get install ssh
```

Installation von Webmin:

```bash
wget http://prdownloads.sourceforge.net/webadmin/webmin_1.660_all.deb
sudo apt-get install libapt-pkg-perl libnet-ssleay-perl libauthen-pam-perl libio-pty-perl apt-show-versions
sudo dpkg --install webmin_1.660_all.deb
```

## Konfiguration von Samba

Siehe die entsprechende Gedächtnisstütze, [hier][samba].

## Feste IP für den Raspberry im Netzwerk

Die Datei **interfaces** bearbeiten:

```bash
sudo gedit /etc/network/interfaces
```

> Im Konsolenmodus einfacher; ab Wheezy muss _gedit_ durch den Editor _leafpad_ ersetzt werden

Und

```
iface eth0 inet dhcp
```

ersetzen durch

```
iface eth0 inet static
address 192.168.0.1
netmask 255.255.255.0
gateway 192.168.0.254
```

Den Raspberry PI neu starten:

```bash
sudo reboot
```

## Installation von Node.js

```bash
cd /home/keople
wget http://nodejs.org/dist/v0.10.28/node-v0.10.28.tar.gz
tar -zxf node-v0.10.28.tar.gz
cd node-v0.10.28
./configure
sudo make install
```

> Um eine andere Version zu installieren, siehe die [Website von Node.JS][1].

> Node.js ohne SUDO

```bash
sudo chown -R $USER /usr/local
sudo chown -R $USER /home/$USER/.npm
```

## Installation von Yeoman

```bash
npm install -g yo
npm install -g grunt-cli
npm install -g bower
```

Siehe die entsprechende Gedächtnisstütze, [hier][yeoman].

## Installation eines privaten Git-Servers

```bash
sudo apt-get install git-core
sudo apt-get install wget (falls nötig)
sudo apt-get install ssh (falls nötig)
sudo /etc/init.d/ssh start (falls nötig)
sudo update-rc.d ssh defaults (falls nötig)
```

#### Anlegen eines neuen Benutzers **git**:

```bash
sudo adduser --system --shell /bin/bash --gecos 'git version control by pi' --group --home /home/git git
```

oder Anlegen der Gruppe **git** und Zuweisung an einen Benutzer

```bash
sudo addgroup git
sudo adduser $USER git
```

#### Anlegen eines neuen Projekts:

```bash
cd /home/$USER
mkdir git
cd git
mkdir default.git
cd default.git
git --bare init
sudo git remote add default $USER@[hostname]:/home/$USER/git/default.git
```

#### Anwendungsbeispiel

Im eigenen Arbeitsbereich das Projekt holen:

```bash
git clone $USER@[hostname]:/home/$USER/git/default.git
```

Eine Datei **test.txt** anlegen:

```bash
git add test.txt
git commit -am "initial"
git push origin master
```

[samba]: /de/merkzettel/samba-dateifreigabe-server
[yeoman]: /de/merkzettel/grunt-yo-bower-yeoman
[1]: http://nodejs.org/dist/
