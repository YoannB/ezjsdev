---
title: "Node.js installieren"
slug: node-js-installieren
date: 2013-12-01
description: "Merkzettel zur Installation von Node.JS."
---

## Windows

Der Anleitung auf der offiziellen Website [nodejs.org][1] folgen.

## Ubuntu

In einem Terminal folgende Zeilen ausführen:

```bash
sudo apt-get install npm
sudo npm cache clean -f
sudo npm install -g n
sudo apt-get install curl ( if needed )
sudo n stable
```

> **HINWEIS:** Bei Fehlern beim Abrufen von Paketen helfen zwei Zeilen:
>
> Die Registry einstellen:
>
> ```bash
> npm config set registry http://registry.npmjs.org/
> ```
>
> Und wenn man hinter einem Proxy sitzt:
>
> ```bash
> git config --global url."https://".insteadOf git://
> ```

## Um die Abhängigkeiten zu installieren, im Projektordner

```bash
sudo npm install
```

## Um die Node-Anwendung 'app' zu starten

```bash
node app.js
```

Oder, wenn in package.json der Befehl "start" definiert ist

```json
"scripts" : {
  "start" : "node app.js"
}
```

Genügt

```bash
npm start
```

> **Installation ohne SUDO:** Es empfiehlt sich, Node.JS so zu installieren, dass man nicht bei jedem Befehl **sudo** verwenden muss.
>
> Die Rechte der lokalen Installation ändern:
>
> ```bash
> sudo chown -R $USER /usr/local
> ```
>
> und falls das Verzeichnis existiert:
>
> ```bash
> sudo chown -R $USER /usr/lib/node_modules/
> ```

[1]: http://nodejs.org/
