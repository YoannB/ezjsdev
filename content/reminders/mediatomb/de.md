---
title: "Mediatomb unter Ubuntu"
slug: mediatomb-unter-ubuntu
date: 2014-05-08
description: "Merkzettel zum Einrichten eines Mediatomb-Servers (Ubuntu)."
---

**Hinweis:** Dieser Merkzettel bezieht sich auf meinen aktuellen Job, eine Kleinigkeit, die ich diese Woche installieren musste, um das Projekt zu testen, an dem ich arbeite.

Mit **Mediatomb** kann man einen eigenen DLNA-Server einrichten und so unter anderem die Inhalte des Servers auf dem Fernseher oder der Set-Top-Box ansehen.

## Installation

Offizielle Dokumentation [hier][1]

```bash
sudo apt-get install mediatomb
```

## Konfiguration

#### Um die Mediatomb-Oberfläche zu aktivieren, die Konfigurationsdatei bearbeiten:

```bash
sudo gedit /etc/mediatomb/config.xml
```

Den Wert ändern (Zeile 7)

```xml
<ui enabled="no" show-tooltips="yes">
```

in

```xml
<ui enabled="yes" show-tooltips="yes">
```

Dann den Server neu starten:

```bash
sudo service mediatomb restart
```

#### Zugriff auf die Weboberfläche

[http://localhost:49152/][2] (mit Ubuntu 10.04 und 10.10)

oder

[http://localhost:49153/][3] (mit Ubuntu 13.04+)

#### Vorschau

![Weboberfläche von Mediatomb](/reminders/mediatomb/mediatomb.png)

**Hinweis**: Um die Datenbank zu leeren, die Datei **/var/lib/mediatomb/mediatomb.db** löschen und dann mediatomb neu starten.

[1]: http://doc.ubuntu-fr.org/mediatomb
[2]: http://localhost:49152/
[3]: http://localhost:49153/
