---
title: "Raspberry PI"
slug: raspberry-pi-como-servidor
date: 2014-09-20
description: "Configuración de una Raspberry PI como servidor."
---

Instalar y configurar tu raspberry PI como servidor.

## Instalación de la tarjeta SD

En ubuntu, hay que desmontar la tarjeta SD para después copiar la imagen:

```bash
# obtener el nombre de la tarjeta SD
df -h
# desmontar la tarjeta SD
umount /dev/sdb1
# Copia de la imagen Raspbian en la tarjeta SD
dd bs=4M if=YYYY-MM-DD-wheezy-raspbian.img of=/dev/sdb
```

> Entre los posibles problemas, si la raspberry muestra una pantalla negra, añadir en el archivo **config.txt** de la tarjeta SD la línea:

```ini
#help to boot
boot_delay=1
```

> Resolución HD con una raspberry pi 2 y Wheezy:

```ini
hdmi_drive=2
hdmi_group=1
hdmi_mode=31
```

> Las demás opciones se describen en el archivo de configuración de la tarjeta SD.

## Configuración

La ventana de configuración se abre automáticamente en el primer arranque, pero también se puede volver a abrir escribiendo en la consola el comando:

```bash
sudo raspi-config
```

## Montar un disco duro externo

Para disponer de más almacenamiento y también para alargar la vida útil de la tarjeta SD, es preferible configurar el almacenamiento en un disco duro externo.

> Previamente: configurar las particiones del nuevo disco duro con una utilidad (en ubuntu, usar **gparted** por ejemplo):
>
> - una partición para el **home**
> - una partición para el almacenamiento

Después de conectar el disco duro a la raspberry PI, hay que

```bash
# obtener el nombre del disco duro
df -h
# montar el disco duro (cambiar sdb1 por el nombre encontrado)
mount /dev/sdb1 /media/data
```

Para ahorrar la tarjeta SD, copio también todo el **home** en la partición del disco duro

```bash
# mover home a una partición /home del disco duro externo
cd /mnt
sudo mkdir new_home/
sudo mount /dev/sda1 /mnt/new_home
sudo cp -a /home/. /mnt/new_home/
```

Terminar añadiendo a la tabla de particiones de la raspberry PI,

```bash
sudo vi /etc/fstab
```

Las siguientes líneas:

```
# nuevo home
/dev/sdb1       /home           ext4    defaults        0       2
# partición de almacenamiento
/dev/sdb2       /media/data     ext4    defaults        0       2
```

## Configuración del **hostname**

El nombre que tendrá la Raspberry PI en la red se puede configurar desde la ventana de configuración (sudo raspi-config), pero también se puede editar a mano en el archivo **hosts**:

```bash
sudo vi /etc/hosts
```

Añadir las líneas:

```
127.0.0.1 localhost
127.0.0.1 nombre-de-la-maquina
```

## Gestión de usuarios

Para añadir un usuario a la raspberry PI:

```bash
sudo adduser username
```

> Para que el nuevo usuario tenga los mismos derechos que el usuario **pi** por defecto, ejecutar:

```bash
sudo visudo
```

Y añadir la línea:

```
username ALL=(ALL) NOPASSWD: ALL
```

Después pulsar **Ctrl+O**, **Intro**, **Ctrl+X**.

## Instalación de los paquetes útiles para el servidor

Actualización de los paquetes:

```bash
sudo apt-get update
sudo apt-get upgrade
```

Instalación de samba:

```bash
sudo apt-get install samba samba-common-bin
```

Instalación de Lighttpd (equivalente ligero y sencillo de un servidor apache):

```bash
sudo apt-get install lighttpd
```

Instalación de ssh:

```bash
sudo apt-get install ssh
```

Instalación de Webmin:

```bash
wget http://prdownloads.sourceforge.net/webadmin/webmin_1.660_all.deb
sudo apt-get install libapt-pkg-perl libnet-ssleay-perl libauthen-pam-perl libio-pty-perl apt-show-versions
sudo dpkg --install webmin_1.660_all.deb
```

## Configuración de Samba

Ver el recordatorio correspondiente, [aquí][samba].

## Fijar la ip de la raspberry en la red

Editar el archivo **interfaces**:

```bash
sudo gedit /etc/network/interfaces
```

> Más fácil de hacer en modo consola; a partir de Wheezy, _gedit_ debe sustituirse por el editor _leafpad_

Y sustituir

```
iface eth0 inet dhcp
```

Por

```
iface eth0 inet static
address 192.168.0.1
netmask 255.255.255.0
gateway 192.168.0.254
```

Reiniciar la raspberry PI:

```bash
sudo reboot
```

## Instalación de Node.js

```bash
cd /home/keople
wget http://nodejs.org/dist/v0.10.28/node-v0.10.28.tar.gz
tar -zxf node-v0.10.28.tar.gz
cd node-v0.10.28
./configure
sudo make install
```

> Para cambiar la versión a instalar, consultar el [sitio de Node.JS][1].

> Node.js sin SUDO

```bash
sudo chown -R $USER /usr/local
sudo chown -R $USER /home/$USER/.npm
```

## Instalación de Yeoman

```bash
npm install -g yo
npm install -g grunt-cli
npm install -g bower
```

Ver el recordatorio correspondiente, [aquí][yeoman].

## Instalación de un servidor git privado

```bash
sudo apt-get install git-core
sudo apt-get install wget (si hace falta)
sudo apt-get install ssh (si hace falta)
sudo /etc/init.d/ssh start (si hace falta)
sudo update-rc.d ssh defaults (si hace falta)
```

#### Creación de un nuevo usuario **git**:

```bash
sudo adduser --system --shell /bin/bash --gecos 'git version control by pi' --group --home /home/git git
```

o creación del grupo **git** y añadirlo a un usuario

```bash
sudo addgroup git
sudo adduser $USER git
```

#### Creación de un nuevo proyecto:

```bash
cd /home/$USER
mkdir git
cd git
mkdir default.git
cd default.git
git --bare init
sudo git remote add default $USER@[hostname]:/home/$USER/git/default.git
```

#### Ejemplo de uso

En tu espacio de trabajo, recuperar el proyecto:

```bash
git clone $USER@[hostname]:/home/$USER/git/default.git
```

Crear un archivo **test.txt**:

```bash
git add test.txt
git commit -am "initial"
git push origin master
```

[samba]: #!reminders/samba
[yeoman]: #!reminders/yeoman
[1]: http://nodejs.org/dist/
