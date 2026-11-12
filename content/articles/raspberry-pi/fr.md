---
title: "Raspberry PI"
slug: raspberry-pi-comme-serveur
date: 2014-09-20
description: "Configuration d'un Raspberry PI comme un serveur."
---

Installer et configurer son raspberry PI comme un serveur.

## Installation de la carte SD

Sous ubuntu, il faut démonter la carte SD pour ensuite faire la copie de l'image :

```
# récupérer le nom de la carte SD
df -h
# démonter la carte SD
umount /dev/sdb1
# Copie de l'image Raspbian sur la carte SD
dd bs=4M if=YYYY-MM-DD-wheezy-raspbian.img of=/dev/sdb
```

> Parmi les problèmes possibles, si le raspberry affiche un écran noir, ajouter dans le fichier **config.txt** sur la carte SD la ligne :

```
#help to boot
boot_delay=1
```

> Résolution HD avec un raspberry pi 2 et Wheezy :

```
hdmi_drive=2
hdmi_group=1
hdmi_mode=31
```

> Les autres options sont décrites dans le fichier de configuration de la carte SD.

## Configuration

La fenêtre de configuration se lance automatiquement au premier démarrage mais il est aussi possible de rappeler la fenêtre de configuration en tapant dans la console la commande :

```
sudo raspi-config
```

## Monter un disque dur externe

Pour bénéficier d'un stockage plus important et aussi pour économiser la durée de vie de la carte SD, il est préférable de configurer un stockage sur un disque dur externe.

> Au préalable : configurer les partitions du nouveau disque dur avec un utilitaire (sous ubuntu, utiliser **gparted** par exemple) :
>
> - une partition pour le **home**
> - une partition pour le stockage

Après avoir branché le disque dur sur le raspberry PI, il faut

```
# récupérer le nom du disque dur
df -h
# monter le disque dur (changer sdb1 par le nom trouvé)
mount /dev/sdb1 /media/data
```

Pour économiser la carte SD, je recopie également l'intégralité du **home** sur la partition du disque dur

```
# déplacer home vers une partition /home du disque dur externe
cd /mnt
sudo mkdir new_home/
sudo mount /dev/sda1 /mnt/new_home
sudo cp -a /home/. /mnt/new_home/
```

Finir par ajouter à la table des partitions du raspberry PI,

```
sudo vi /etc/fstab
```

Les lignes suivantes :

```
# nouveau home
/dev/sdb1       /home           ext4    defaults        0       2
# partition de stockage
/dev/sdb2       /media/data     ext4    defaults        0       2
```

## Paramétrage du **hostname**

Le nom que portera le Raspberry PI sur le réseau est configurable à partir de la fenêtre de configuration (sudo raspi-config) mais on peut aussi l'éditer à la main dans le fichier **hosts** :

```
sudo vi /etc/hosts
```

Ajouter les lignes :

```
127.0.0.1 localhost
127.0.0.1 nom-de-la-machine
```

## Gestion des utilisateurs

Pour ajouter un utilisateur au raspberry PI :

```
sudo adduser username
```

> Pour que le nouvel utilisateur ait les mêmes droits que l'utilisateur **pi** par défaut, faire :

```
sudo visudo
```

Et ajouter la ligne :

```
username ALL=(ALL) NOPASSWD: ALL
```

Ensuite faire **Ctrl+O**, **Entrer**, **Ctrl+X**.

## Installation des paquets utiles au serveur

Mise à jour des paquets :

```
sudo apt-get update
sudo apt-get upgrade
```

Installation de samba :

```
sudo apt-get install samba samba-common-bin
```

Installation de Lighttpd (équivalent léger et simple d'un serveur apache) :

```
sudo apt-get install lighttpd
```

Installation de ssh :

```
sudo apt-get install ssh
```

Installation de Webmin :

```
wget http://prdownloads.sourceforge.net/webadmin/webmin_1.660_all.deb
sudo apt-get install libapt-pkg-perl libnet-ssleay-perl libauthen-pam-perl libio-pty-perl apt-show-versions
sudo dpkg --install webmin_1.660_all.deb
```

## Configuration de Samba

Voir le pense-bête correspondant, [ici][samba].

## Fixer l'ip du raspberry sur le réseau

Éditer le fichier **interfaces** :

```
sudo gedit /etc/network/interfaces
```

> Plus facile à faire en mode console, _gedit_ devant être remplacé par l'éditeur _leafpad_ à partir de Wheezy

Et remplacer

```
iface eth0 inet dhcp
```

Par

```
iface eth0 inet static
address 192.168.0.1
netmask 255.255.255.0
gateway 192.168.0.254
```

Redémarrer le raspberry PI :

```
sudo reboot
```

## Installation de Node.js

```
cd /home/keople
wget http://nodejs.org/dist/v0.10.28/node-v0.10.28.tar.gz
tar -zxf node-v0.10.28.tar.gz
cd node-v0.10.28
./configure
sudo make install
```

> Pour changer la version à installer, aller voir sur le [site de Node.JS][1].

> Node.js without SUDO

```
sudo chown -R $USER /usr/local
sudo chown -R $USER /home/$USER/.npm
```

## Installation de Yeoman

```
npm install -g yo
npm install -g grunt-cli
npm install -g bower
```

Voir le pense-bête correspondant, [ici][yeoman].

## Installation d'un serveur privé git

```
sudo apt-get install git-core
sudo apt-get install wget (si besoin)
sudo apt-get install ssh (si besoin)
sudo /etc/init.d/ssh start (si besoin)
sudo update-rc.d ssh defaults (si besoin)
```

#### Création d'un nouvel utilisateur **git** :

```
sudo adduser --system --shell /bin/bash --gecos 'git version control by pi' --group --home /home/git git
```

ou création du groupe **git** et ajout à un utilisateur

```
sudo addgroup git
sudo adduser $USER git
```

#### Création d'un nouveau projet :

```
cd /home/$USER
mkdir git
cd git
mkdir default.git
cd default.git
git --bare init
sudo git remote add default $USER@[hostname]:/home/$USER/git/default.git
```

#### Exemple d'utilisation

Dans son espace de travail, récupérer le projet :

```
git clone $USER@[hostname]:/home/$USER/git/default.git
```

Créer un fichier **test.txt** :

```
git add test.txt
git commit -am "initial"
git push origin master
```

[samba]: #!reminders/samba
[yeoman]: #!reminders/yeoman
[1]: http://nodejs.org/dist/
