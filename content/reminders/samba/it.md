---
title: "Server di condivisione Samba"
slug: server-di-condivisione-samba
date: 2014-09-22
description: "Promemoria per creare un server di condivisione Samba."
---

## Installazione

Installare i seguenti pacchetti:

```bash
sudo apt-get install samba samba-common-bin
```

## Configurazione

Tutta la configurazione si fa nel file **smb.conf** (su Ubuntu /etc/samba/smb.conf). Il file di configurazione è commentato ed è piuttosto semplice da modificare.

Ecco un esempio con le righe da aggiungere per creare una cartella **public** e una cartella **partage** (condivisione) protetta:

```ini
[Public]
#
# Cartella "tuttofare" scrivibile da tutti
#
    comment = Partage Public
    path = /mnt/data/public
    create mode = 644
    writeable = yes
    public = yes
    hide files = /lost+found/

#
# Condivisione di una cartella montata sul server
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

> Nota: per chi preferisce le interfacce grafiche, è possibile installare [webmin][1], che contiene una sezione per amministrare il proprio server Samba.

## Sicurezza

Con l'opzione **encrypt passwords = true**, bisogna creare o modificare gli utenti che avranno accesso alle cartelle.

Per prima cosa, se il gruppo **samba** non è stato creato, lo si aggiunge:

```bash
sudo groupadd samba
```

Poi bisogna:

- creare un nuovo utente samba:

    ```bash
    sudo useradd -s /bin/false -d /dev/null -g samba [nome_utente]
    sudo smbpasswd -a [nome_utente]
    ```

- oppure modificare un utente esistente:

    ```bash
    sudo adduser [nome_utente_esistente] samba
    sudo smbpasswd -a [nome_utente_esistente]
    ```

[1]: http://www.webmin.com/
