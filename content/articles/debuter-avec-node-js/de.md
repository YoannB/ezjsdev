---
title: "Einstieg in Node.JS"
slug: einstieg-in-node-js
date: 2013-12-01
description: "Wie man mit Node.JS anfängt."
---

## Installation

Siehe die Gedächtnisstütze [nodejs][1].

## Verwendung

Erste Schritte mit Modulen

- Beispiel für ein Konfigurationsmodul (JSON-Objekt):

    ```javascript
    var conf = require('./config');
    // conf.prop1
    // conf.prop2
    /* Datei /config/index.js oder /PATH/config.js */
    module.exports = {
        prop1:"val1",
        prop2:"val2"
    };
    ```

- Beispiel für ein Modul im Server-Stil:

    ```javascript
    var server = require('./server');
    server.newMethod();
    /* Datei /server/index.js oder /PATH/server.js */
    var app = express();
    app.newMethod = function () {

    };
    module.exports = app;
    ```

- komplexes Beispiel mit Abhängigkeit:

    ```javascript
    var db = require('./db');
    var handler = require('./handler')(db);
    /* Datei /handler/index.js oder /PATH/handler.js */
    module.exports = function (db) {
        console.log("db="+db);
    };
    ```

- Beispiel für ein Hilfsmodul:

    ```javascript
    var utils = require('./utils');
    /* Datei /utils/index.js oder /PATH/utils.js */
    exports.method1 = function (arg) {
        console.log("arg="+arg);
    };
    exports.method2 = function (arg1,arg2) {
        console.log("arg1="+arg1+" & arg2="+arg2);
    };
    ```

## Einfaches Beispielprojekt

Zuerst eine Datei **package.json** mit folgendem Inhalt anlegen:

```javascript
{
  "name": "helloworld",
  "version": "0.1.0",
  "description": "helloworld",
  "main": "hello-world-server.js",
  "scripts": {
    "start": "node hello-world-server.js",
    "test": "echo \"Error: no test specified! Configure in package.json\" && exit 1"
  },
  "repository": "",
  "keywords": [
    "Node.js",
    "Eclipse",
    "Nodeclipse",
    "jade"
  ],
  "author": "",
  "license": "MIT"
}
```

Danach eine zweite Datei **hello-world-server.js** mit folgendem Inhalt anlegen:

```javascript
var http = require('http');
http.createServer(function handler(req, res) {
    console.log("Helloword");
    console.log("coucouc charles");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

Jetzt bleibt nur noch, den Server zu testen, mit dem Befehl:

```bash
npm start
```

Das Ergebnis ist direkt unter http://127.0.0.1:1337/ zu sehen.

## Tests

Node.JS ermöglicht umfangreiche Tests; dazu installiert man zunächst die Abhängigkeiten:

```bash
npm install -g karma
npm install -g mocha
npm install karma-mocha --save-dev
```

Beispiel folgt...

## Versionierung

Git als Versionierungswerkzeug, Installation der Abhängigkeiten:

```bash
sudo apt-get install git
Git to path (;C:\Program Files (x86)\Git\bin;C:\Program Files (x86)\Git\cmd)
git config --global user.name "NAME"
git config --global user.email "NAME@GMAIL.COM"
(git config --global credential.helper cache)
(git config --global credential.helper 'cache --timeout=3600')
```

## Nützliches

Mysql:

```bash
sudo npm -g install node-mysql
```

MongoDB:

```bash
sudo apt-get install mongodb
```

Inliner:

```bash
sudo npm -g install inliner
sudo inliner --verbose --nocompress http://localhost/ > inline.html
```

Kollaborativ:

```bash
npm install hackify -g
cd /project_name
hackify
```

Livereload ohne Gruntfile:

```bash
npm install -g livereload
npm install livereload --save
npm install express-livereload --save
```

Mail (https://github.com/andris9/nodemailer):

```bash
npm install nodemailer --save
```

[1]: /de/merkzettel/node-js-installieren
