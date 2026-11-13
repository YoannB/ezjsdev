---
title: "Débuter avec Node.JS"
slug: debuter-avec-node-js
date: 2013-12-01
description: "Comment débuter avec Node.JS."
---

## Installation

Voir le pense-bête [nodejs][1].

## Utilisation

Prise en main des modules

- exemple de module de configuration (Objet JSON) :

    ```javascript
    var conf = require('./config');
    // conf.prop1
    // conf.prop2
    /* fichier /config/index.js or /PATH/config.js */
    module.exports = {
        prop1:"val1",
        prop2:"val2"
    };
    ```

- exemple de module style server :

    ```javascript
    var server = require('./server');
    server.newMethod();
    /* fichier /server/index.js or /PATH/server.js */
    var app = express();
    app.newMethod = function () {

    };
    module.exports = app;
    ```

- exemple complexe avec dépendance :

    ```javascript
    var db = require('./db');
    var handler = require('./handler')(db);
    /* fichier /handler/index.js or /PATH/handler.js */
    module.exports = function (db) {
        console.log("db="+db);
    };
    ```

- exemple de module utilitaire :

    ```javascript
    var utils = require('./utils');
    /* fichier /utils/index.js or /PATH/utils.js */
    exports.method1 = function (arg) {
        console.log("arg="+arg);
    };
    exports.method2 = function (arg1,arg2) {
        console.log("arg1="+arg1+" & arg2="+arg2);
    };
    ```

## Projet simple exemple

Il faut créer un premier fichier **package.json** contenant :

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

Ensuite, créer un second fichier **hello-world-server.js** contenant :

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

Puis, il ne reste qu'à tester le serveur, on lance la commande :

```bash
npm start
```

Et on peut directement voir le résultat sur http://127.0.0.1:1337/.

## Tests

Node.JS permet de mettre en œuvre des tests poussés, pour cela on commence par installer les dépendances :

```bash
npm install -g karma
npm install -g mocha
npm install karma-mocha --save-dev
```

Exemple à venir...

## Versioning

Utilisation de Git comme outil de versioning, installation des dépendances :

```bash
sudo apt-get install git
Git to path (;C:\Program Files (x86)\Git\bin;C:\Program Files (x86)\Git\cmd)
git config --global user.name "NAME"
git config --global user.email "NAME@GMAIL.COM"
(git config --global credential.helper cache)
(git config --global credential.helper 'cache --timeout=3600')
```

## Utiles

Mysql :

```bash
sudo npm -g install node-mysql
```

MongoDB :

```bash
sudo apt-get install mongodb
```

Inliner :

```bash
sudo npm -g install inliner
sudo inliner --verbose --nocompress http://localhost/ > inline.html
```

Collaboratif :

```bash
npm install hackify -g
cd /project_name
hackify
```

Livereload sans gruntfile :

```bash
npm install -g livereload
npm install livereload --save
npm install express-livereload --save
```

Mail (https://github.com/andris9/nodemailer) :

```bash
npm install nodemailer --save
```

[1]: #!reminders/installation-de-node-js
