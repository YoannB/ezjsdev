---
title: "Mediatomb sous Ubuntu"
slug: mediatomb-sous-ubuntu
date: 2014-05-08
description: "Pense-bête pour créer un serveur Mediatomb (Ubuntu)."
---

**Note :** voici un pense-bête se rapportant à mon job actuel, une petite chose que j'ai eu à installer cette semaine pour tester le projet sur lequel je travaille.

**Mediatomb** permet de créer son propre serveur DLNA, ainsi on peut entre autres visualiser le contenu du serveur sur sa télé ou sa box.

## Installation

Documentation officielle [ici][1]

```bash
sudo apt-get install mediatomb
```

## Configuration

#### Pour activer l'interface Mediatomb, éditer le fichier de configuration :

```bash
sudo gedit /etc/mediatomb/config.xml
```

Changer la valeur (ligne 7)

```xml
<ui enabled="no" show-tooltips="yes">
```

par

```xml
<ui enabled="yes" show-tooltips="yes">
```

Puis, redémarrez le serveur :

```bash
sudo service mediatomb restart
```

#### Accès interface web

[http://localhost:49152/][2] (avec Ubuntu 10.04 et 10.10)

ou

[http://localhost:49153/][3] (avec Ubuntu 13.04+)

#### Aperçu

![Interface web de Mediatomb](/reminders/mediatomb/mediatomb.png)

**Note** : pour purger la base de données, supprimer le fichier **/var/lib/mediatomb/mediatomb.db**, puis redémarrer mediatomb.

[1]: http://doc.ubuntu-fr.org/mediatomb
[2]: http://localhost:49152/
[3]: http://localhost:49153/
