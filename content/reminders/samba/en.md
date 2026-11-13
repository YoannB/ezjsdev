---
title: "Samba file sharing server"
slug: samba-file-sharing-server
date: 2014-09-22
description: "Reminder for setting up a Samba file sharing server."
---

## Installation

Install the following packages:

```bash
sudo apt-get install samba samba-common-bin
```

## Configuration

All the configuration is done in the **smb.conf** file (on Ubuntu /etc/samba/smb.conf). The configuration file is commented and fairly easy to edit.

Here is an example with the lines to add to create a **public** directory and a secured **partage** (share) directory:

```ini
[Public]
#
# "Catch-all" directory, writable by everyone
#
    comment = Partage Public
    path = /mnt/data/public
    create mode = 644
    writeable = yes
    public = yes
    hide files = /lost+found/

#
# Share of a directory mounted on the server
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

> Note: for those who prefer graphical interfaces, you can install [webmin][1], which has a section to administer your Samba server.

## Security

With the **encrypt passwords = true** option, you need to create or modify the users who will be allowed to access the directories.

First, if the **samba** group has not been created, add it:

```bash
sudo groupadd samba
```

Then you need to:

- create a new samba user:

    ```bash
    sudo useradd -s /bin/false -d /dev/null -g samba [user_name]
    sudo smbpasswd -a [user_name]
    ```

- or modify an existing user:

    ```bash
    sudo adduser [existing_user_name] samba
    sudo smbpasswd -a [existing_user_name]
    ```

[1]: http://www.webmin.com/
