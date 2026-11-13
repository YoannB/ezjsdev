---
title: "Mediatomb on Ubuntu"
slug: mediatomb-on-ubuntu
date: 2014-05-08
description: "Reminder for setting up a Mediatomb server (Ubuntu)."
---

**Note:** here is a reminder related to my current job, a little something I had to install this week to test the project I'm working on.

**Mediatomb** lets you create your own DLNA server, so you can, among other things, browse the server's content on your TV or your set-top box.

## Installation

Official documentation [here][1]

```bash
sudo apt-get install mediatomb
```

## Configuration

#### To enable the Mediatomb interface, edit the configuration file:

```bash
sudo gedit /etc/mediatomb/config.xml
```

Change the value (line 7)

```xml
<ui enabled="no" show-tooltips="yes">
```

to

```xml
<ui enabled="yes" show-tooltips="yes">
```

Then restart the server:

```bash
sudo service mediatomb restart
```

#### Web interface access

[http://localhost:49152/][2] (with Ubuntu 10.04 and 10.10)

or

[http://localhost:49153/][3] (with Ubuntu 13.04+)

#### Preview

![Mediatomb web interface](/reminders/mediatomb/mediatomb.png)

**Note**: to purge the database, delete the **/var/lib/mediatomb/mediatomb.db** file, then restart mediatomb.

[1]: http://doc.ubuntu-fr.org/mediatomb
[2]: http://localhost:49152/
[3]: http://localhost:49153/
