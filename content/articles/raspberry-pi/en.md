---
title: "Raspberry PI"
slug: raspberry-pi-as-a-server
date: 2014-09-20
description: "Setting up a Raspberry PI as a server."
---

Installing and configuring your raspberry PI as a server.

## Installing the SD card

Under ubuntu, the SD card must be unmounted before copying the image:

```bash
# get the name of the SD card
df -h
# unmount the SD card
umount /dev/sdb1
# Copy the Raspbian image to the SD card
dd bs=4M if=YYYY-MM-DD-wheezy-raspbian.img of=/dev/sdb
```

> Among the possible problems, if the raspberry shows a black screen, add the following line to the **config.txt** file on the SD card:

```ini
#help to boot
boot_delay=1
```

> HD resolution with a raspberry pi 2 and Wheezy:

```ini
hdmi_drive=2
hdmi_group=1
hdmi_mode=31
```

> The other options are described in the configuration file of the SD card.

## Configuration

The configuration window opens automatically on first boot, but it can also be brought back by typing the following command in the console:

```bash
sudo raspi-config
```

## Mounting an external hard drive

To get more storage, and also to extend the life of the SD card, it is better to set up storage on an external hard drive.

> Beforehand: set up the partitions of the new hard drive with a utility (under ubuntu, use **gparted** for example):
>
> - a partition for the **home**
> - a partition for storage

After plugging the hard drive into the raspberry PI, you need to

```bash
# get the name of the hard drive
df -h
# mount the hard drive (replace sdb1 with the name found)
mount /dev/sdb1 /media/data
```

To spare the SD card, I also copy the whole **home** onto the hard drive partition

```bash
# move home to a /home partition of the external hard drive
cd /mnt
sudo mkdir new_home/
sudo mount /dev/sda1 /mnt/new_home
sudo cp -a /home/. /mnt/new_home/
```

Finish by adding to the raspberry PI's partition table,

```bash
sudo vi /etc/fstab
```

The following lines:

```
# new home
/dev/sdb1       /home           ext4    defaults        0       2
# storage partition
/dev/sdb2       /media/data     ext4    defaults        0       2
```

## Setting the **hostname**

The name the Raspberry PI will have on the network can be set from the configuration window (sudo raspi-config), but it can also be edited by hand in the **hosts** file:

```bash
sudo vi /etc/hosts
```

Add the lines:

```
127.0.0.1 localhost
127.0.0.1 machine-name
```

## Managing users

To add a user to the raspberry PI:

```bash
sudo adduser username
```

> For the new user to have the same rights as the default **pi** user, run:

```bash
sudo visudo
```

And add the line:

```
username ALL=(ALL) NOPASSWD: ALL
```

Then press **Ctrl+O**, **Enter**, **Ctrl+X**.

## Installing useful packages for the server

Updating the packages:

```bash
sudo apt-get update
sudo apt-get upgrade
```

Installing samba:

```bash
sudo apt-get install samba samba-common-bin
```

Installing Lighttpd (a light and simple equivalent of an apache server):

```bash
sudo apt-get install lighttpd
```

Installing ssh:

```bash
sudo apt-get install ssh
```

Installing Webmin:

```bash
wget http://prdownloads.sourceforge.net/webadmin/webmin_1.660_all.deb
sudo apt-get install libapt-pkg-perl libnet-ssleay-perl libauthen-pam-perl libio-pty-perl apt-show-versions
sudo dpkg --install webmin_1.660_all.deb
```

## Samba configuration

See the corresponding reminder, [here][samba].

## Setting a fixed ip for the raspberry on the network

Edit the **interfaces** file:

```bash
sudo gedit /etc/network/interfaces
```

> Easier to do in console mode; _gedit_ must be replaced by the _leafpad_ editor from Wheezy onwards

And replace

```
iface eth0 inet dhcp
```

With

```
iface eth0 inet static
address 192.168.0.1
netmask 255.255.255.0
gateway 192.168.0.254
```

Restart the raspberry PI:

```bash
sudo reboot
```

## Installing Node.js

```bash
cd /home/keople
wget http://nodejs.org/dist/v0.10.28/node-v0.10.28.tar.gz
tar -zxf node-v0.10.28.tar.gz
cd node-v0.10.28
./configure
sudo make install
```

> To change the version to install, have a look at the [Node.JS website][1].

> Node.js without SUDO

```bash
sudo chown -R $USER /usr/local
sudo chown -R $USER /home/$USER/.npm
```

## Installing Yeoman

```bash
npm install -g yo
npm install -g grunt-cli
npm install -g bower
```

See the corresponding reminder, [here][yeoman].

## Installing a private git server

```bash
sudo apt-get install git-core
sudo apt-get install wget (if needed)
sudo apt-get install ssh (if needed)
sudo /etc/init.d/ssh start (if needed)
sudo update-rc.d ssh defaults (if needed)
```

#### Creating a new **git** user:

```bash
sudo adduser --system --shell /bin/bash --gecos 'git version control by pi' --group --home /home/git git
```

or create the **git** group and add it to a user

```bash
sudo addgroup git
sudo adduser $USER git
```

#### Creating a new project:

```bash
cd /home/$USER
mkdir git
cd git
mkdir default.git
cd default.git
git --bare init
sudo git remote add default $USER@[hostname]:/home/$USER/git/default.git
```

#### Usage example

In your workspace, fetch the project:

```bash
git clone $USER@[hostname]:/home/$USER/git/default.git
```

Create a **test.txt** file:

```bash
git add test.txt
git commit -am "initial"
git push origin master
```

[samba]: #!reminders/samba
[yeoman]: #!reminders/yeoman
[1]: http://nodejs.org/dist/
