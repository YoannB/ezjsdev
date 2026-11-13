---
title: "Servidor para compartir archivos con Samba"
slug: servidor-para-compartir-archivos-samba
date: 2014-09-22
description: "Recordatorio para crear un servidor de archivos compartidos con Samba."
---

## Instalación

Instalar los siguientes paquetes:

```bash
sudo apt-get install samba samba-common-bin
```

## Configuración

Toda la configuración se hace en el archivo **smb.conf** (en Ubuntu /etc/samba/smb.conf). El archivo de configuración está comentado y es bastante sencillo de modificar.

Este es un ejemplo con las líneas que hay que añadir para crear un directorio **public** y un directorio **partage** (compartido) protegido:

```ini
[Public]
#
# Directorio "cajón de sastre" con permiso de escritura para todos
#
    comment = Partage Public
    path = /mnt/data/public
    create mode = 644
    writeable = yes
    public = yes
    hide files = /lost+found/

#
# Compartir un directorio montado en el servidor
#
[Partage]
    comment = Partage
    path = /mnt/data/media
    available = yes
    browsable = yes
    public = no
    write list = @admin
    writeable = no
    force group = +admin
    force create mode = 664
    force directory mode = 775
    hide files = /lost+found/
```

> Nota: para quienes prefieren las interfaces gráficas, se puede instalar [webmin][1], que incluye una sección para administrar el servidor Samba.

## Seguridad

Con la opción **encrypt passwords = true**, hay que crear o modificar los usuarios que tendrán acceso a los directorios.

Primero, si el grupo **samba** no se ha creado, se añade:

```bash
sudo groupadd samba
```

Después hay que:

- crear un nuevo usuario samba:

    ```bash
    sudo useradd -s /bin/false -d /dev/null -g samba [nombre_usuario]
    sudo smbpasswd -a [nombre_usuario]
    ```

- o modificar un usuario existente:

    ```bash
    sudo adduser [nombre_usuario_existente] samba
    sudo smbpasswd -a [nombre_usuario_existente]
    ```

[1]: http://www.webmin.com/
