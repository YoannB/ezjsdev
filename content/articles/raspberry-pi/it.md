---
title: "Raspberry PI"
slug: raspberry-pi-come-server
date: 2014-09-20
description: "Configurazione di un Raspberry PI come server."
---

Installare e configurare il proprio raspberry PI come server.

## Installazione della scheda SD

Su ubuntu bisogna smontare la scheda SD per poi copiare l'immagine:

```
# recuperare il nome della scheda SD
df -h
# smontare la scheda SD
umount /dev/sdb1
# Copia dell'immagine Raspbian sulla scheda SD
dd bs=4M if=YYYY-MM-DD-wheezy-raspbian.img of=/dev/sdb
```

> Tra i possibili problemi, se il raspberry mostra uno schermo nero, aggiungere nel file **config.txt** sulla scheda SD la riga:

```
#help to boot
boot_delay=1
```

> Risoluzione HD con un raspberry pi 2 e Wheezy:

```
hdmi_drive=2
hdmi_group=1
hdmi_mode=31
```

> Le altre opzioni sono descritte nel file di configurazione della scheda SD.

## Configurazione

La finestra di configurazione si apre automaticamente al primo avvio, ma è anche possibile richiamarla digitando nella console il comando:

```
sudo raspi-config
```

## Montare un disco rigido esterno

Per avere più spazio di archiviazione e anche per preservare la durata della scheda SD, è preferibile configurare l'archiviazione su un disco rigido esterno.

> Prima di tutto: configurare le partizioni del nuovo disco rigido con un'utilità (su ubuntu, usare per esempio **gparted**):
>
> - una partizione per la **home**
> - una partizione per l'archiviazione

Dopo aver collegato il disco rigido al raspberry PI, bisogna

```
# recuperare il nome del disco rigido
df -h
# montare il disco rigido (sostituire sdb1 con il nome trovato)
mount /dev/sdb1 /media/data
```

Per risparmiare la scheda SD, copio anche l'intera **home** sulla partizione del disco rigido

```
# spostare home su una partizione /home del disco rigido esterno
cd /mnt
sudo mkdir new_home/
sudo mount /dev/sda1 /mnt/new_home
sudo cp -a /home/. /mnt/new_home/
```

Infine aggiungere alla tabella delle partizioni del raspberry PI,

```
sudo vi /etc/fstab
```

Le righe seguenti:

```
# nuova home
/dev/sdb1       /home           ext4    defaults        0       2
# partizione di archiviazione
/dev/sdb2       /media/data     ext4    defaults        0       2
```

## Impostazione dell'**hostname**

Il nome che avrà il Raspberry PI sulla rete è configurabile dalla finestra di configurazione (sudo raspi-config), ma si può anche modificare a mano nel file **hosts**:

```
sudo vi /etc/hosts
```

Aggiungere le righe:

```
127.0.0.1 localhost
127.0.0.1 nome-della-macchina
```

## Gestione degli utenti

Per aggiungere un utente al raspberry PI:

```
sudo adduser username
```

> Perché il nuovo utente abbia gli stessi diritti dell'utente **pi** predefinito, eseguire:

```
sudo visudo
```

E aggiungere la riga:

```
username ALL=(ALL) NOPASSWD: ALL
```

Poi premere **Ctrl+O**, **Invio**, **Ctrl+X**.

## Installazione dei pacchetti utili al server

Aggiornamento dei pacchetti:

```
sudo apt-get update
sudo apt-get upgrade
```

Installazione di samba:

```
sudo apt-get install samba samba-common-bin
```

Installazione di Lighttpd (equivalente leggero e semplice di un server apache):

```
sudo apt-get install lighttpd
```

Installazione di ssh:

```
sudo apt-get install ssh
```

Installazione di Webmin:

```
wget http://prdownloads.sourceforge.net/webadmin/webmin_1.660_all.deb
sudo apt-get install libapt-pkg-perl libnet-ssleay-perl libauthen-pam-perl libio-pty-perl apt-show-versions
sudo dpkg --install webmin_1.660_all.deb
```

## Configurazione di Samba

Vedi il promemoria corrispondente, [qui][samba].

## Assegnare un ip fisso al raspberry sulla rete

Modificare il file **interfaces**:

```
sudo gedit /etc/network/interfaces
```

> Più facile da fare in modalità console; a partire da Wheezy _gedit_ va sostituito dall'editor _leafpad_

E sostituire

```
iface eth0 inet dhcp
```

Con

```
iface eth0 inet static
address 192.168.0.1
netmask 255.255.255.0
gateway 192.168.0.254
```

Riavviare il raspberry PI:

```
sudo reboot
```

## Installazione di Node.js

```
cd /home/keople
wget http://nodejs.org/dist/v0.10.28/node-v0.10.28.tar.gz
tar -zxf node-v0.10.28.tar.gz
cd node-v0.10.28
./configure
sudo make install
```

> Per cambiare la versione da installare, consultare il [sito di Node.JS][1].

> Node.js senza SUDO

```
sudo chown -R $USER /usr/local
sudo chown -R $USER /home/$USER/.npm
```

## Installazione di Yeoman

```
npm install -g yo
npm install -g grunt-cli
npm install -g bower
```

Vedi il promemoria corrispondente, [qui][yeoman].

## Installazione di un server git privato

```
sudo apt-get install git-core
sudo apt-get install wget (se necessario)
sudo apt-get install ssh (se necessario)
sudo /etc/init.d/ssh start (se necessario)
sudo update-rc.d ssh defaults (se necessario)
```

#### Creazione di un nuovo utente **git**:

```
sudo adduser --system --shell /bin/bash --gecos 'git version control by pi' --group --home /home/git git
```

oppure creazione del gruppo **git** e aggiunta a un utente

```
sudo addgroup git
sudo adduser $USER git
```

#### Creazione di un nuovo progetto:

```
cd /home/$USER
mkdir git
cd git
mkdir default.git
cd default.git
git --bare init
sudo git remote add default $USER@[hostname]:/home/$USER/git/default.git
```

#### Esempio di utilizzo

Nel proprio spazio di lavoro, recuperare il progetto:

```
git clone $USER@[hostname]:/home/$USER/git/default.git
```

Creare un file **test.txt**:

```
git add test.txt
git commit -am "initial"
git push origin master
```

[samba]: #!reminders/samba
[yeoman]: #!reminders/yeoman
[1]: http://nodejs.org/dist/
