---
title: "Samba-Server für Dateifreigaben"
slug: samba-dateifreigabe-server
date: 2014-09-22
description: "Merkzettel zum Einrichten eines Samba-Servers für Dateifreigaben."
---

## Installation

Folgende Pakete installieren:

```bash
sudo apt-get install samba samba-common-bin
```

## Konfiguration

Die gesamte Konfiguration erfolgt in der Datei **smb.conf** (unter Ubuntu /etc/samba/smb.conf). Die Konfigurationsdatei ist kommentiert und recht einfach zu bearbeiten.

Hier ein Beispiel mit den Zeilen, die für ein **public**-Verzeichnis und ein geschütztes **partage**-Verzeichnis (Freigabe) hinzuzufügen sind:

```ini
[Public]
#
# "Sammel"-Verzeichnis, für alle beschreibbar
#
    comment = Partage Public
    path = /mnt/data/public
    create mode = 644
    writeable = yes
    public = yes
    hide files = /lost+found/

#
# Freigabe eines auf dem Server eingehängten Verzeichnisses
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

> Hinweis: Wer grafische Oberflächen bevorzugt, kann [webmin][1] installieren, das einen Bereich zur Verwaltung des Samba-Servers enthält.

## Sicherheit

Mit der Option **encrypt passwords = true** müssen die Benutzer angelegt oder geändert werden, die Zugriff auf die Verzeichnisse haben sollen.

Zuerst, falls die Gruppe **samba** noch nicht existiert, wird sie angelegt:

```bash
sudo groupadd samba
```

Danach:

- einen neuen samba-Benutzer anlegen:

    ```bash
    sudo useradd -s /bin/false -d /dev/null -g samba [benutzername]
    sudo smbpasswd -a [benutzername]
    ```

- oder einen bestehenden Benutzer ändern:

    ```bash
    sudo adduser [bestehender_benutzername] samba
    sudo smbpasswd -a [bestehender_benutzername]
    ```

[1]: http://www.webmin.com/
