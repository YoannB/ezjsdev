---
title: "Serveur de partage Samba"
slug: serveur-de-partage-samba
date: 2014-09-22
description: "Pense-bête pour créer un serveur de partage Samba."
---

## Installation

Installer les packages suivants :

```bash
sudo apt-get install samba samba-common-bin
```

## Configuration

Toute la configuration se fait dans le fichier **smb.conf** (sous Ubuntu /etc/samba/smb.conf). Le fichier de configuration est commenté et est plutôt simple à modifier.

Voici un exemple avec les lignes à rajouter pour la création d'un répertoire **public** et d'un répertoire **partage** sécurisé :

```ini
[Public]
#
# Répertoire "fourre-tout" accessible en écriture par tout le monde
#
    comment = Partage Public
    path = /mnt/data/public
    create mode = 644
    writeable = yes
    public = yes
    hide files = /lost+found/

#
# Partage d'un répertoire monté sur le serveur
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

> Note : pour ceux qui préfèrent les interfaces graphiques, il est possible d'installer [webmin][1] qui contient une section pour administrer son serveur Samba.

## Sécurité

Avec l'option **encrypt passwords = true**, il faut créer ou modifier les utilisateurs qui auront le droit d'accès aux répertoires.

D'abord, si le groupe **samba** n'a pas été créé, on l'ajoute :

```bash
sudo groupadd samba
```

Ensuite il faut :

- créer un nouvel utilisateur samba :

    ```bash
    sudo useradd -s /bin/false -d /dev/null -g samba [nom_utilisateur]
    sudo smbpasswd -a [nom_utilisateur]
    ```

- ou modifier un utilisateur existant :

    ```bash
    sudo adduser [nom_utilisateur_existant] samba
    sudo smbpasswd -a [nom_utilisateur_existant]
    ```

[1]: http://www.webmin.com/
