---
title: "Mediatomb su Ubuntu"
slug: mediatomb-su-ubuntu
date: 2014-05-08
description: "Promemoria per creare un server Mediatomb (Ubuntu)."
---

**Nota:** ecco un promemoria legato al mio lavoro attuale, una piccola cosa che ho dovuto installare questa settimana per testare il progetto su cui lavoro.

**Mediatomb** permette di creare il proprio server DLNA; così si può, tra l'altro, visualizzare il contenuto del server sulla TV o sul decoder.

## Installazione

Documentazione ufficiale [qui][1]

```bash
sudo apt-get install mediatomb
```

## Configurazione

#### Per attivare l'interfaccia di Mediatomb, modificare il file di configurazione:

```bash
sudo gedit /etc/mediatomb/config.xml
```

Cambiare il valore (riga 7)

```xml
<ui enabled="no" show-tooltips="yes">
```

con

```xml
<ui enabled="yes" show-tooltips="yes">
```

Poi riavviare il server:

```bash
sudo service mediatomb restart
```

#### Accesso all'interfaccia web

[http://localhost:49152/][2] (con Ubuntu 10.04 e 10.10)

oppure

[http://localhost:49153/][3] (con Ubuntu 13.04+)

#### Anteprima

![Interfaccia web di Mediatomb](/reminders/mediatomb/mediatomb.png)

**Nota**: per svuotare il database, eliminare il file **/var/lib/mediatomb/mediatomb.db**, poi riavviare mediatomb.

[1]: http://doc.ubuntu-fr.org/mediatomb
[2]: http://localhost:49152/
[3]: http://localhost:49153/
