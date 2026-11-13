---
title: "Iniziare con Node.JS"
slug: iniziare-con-node-js
date: 2013-12-01
description: "Come iniziare con Node.JS."
---

## Installazione

Vedi il promemoria [nodejs][1].

## Utilizzo

Primi passi con i moduli

- esempio di modulo di configurazione (oggetto JSON):

    ```javascript
    var conf = require('./config');
    // conf.prop1
    // conf.prop2
    /* file /config/index.js o /PATH/config.js */
    module.exports = {
        prop1:"val1",
        prop2:"val2"
    };
    ```

- esempio di modulo in stile server:

    ```javascript
    var server = require('./server');
    server.newMethod();
    /* file /server/index.js o /PATH/server.js */
    var app = express();
    app.newMethod = function () {

    };
    module.exports = app;
    ```

- esempio complesso con dipendenza:

    ```javascript
    var db = require('./db');
    var handler = require('./handler')(db);
    /* file /handler/index.js o /PATH/handler.js */
    module.exports = function (db) {
        console.log("db="+db);
    };
    ```

- esempio di modulo di utilità:

    ```javascript
    var utils = require('./utils');
    /* file /utils/index.js o /PATH/utils.js */
    exports.method1 = function (arg) {
        console.log("arg="+arg);
    };
    exports.method2 = function (arg1,arg2) {
        console.log("arg1="+arg1+" & arg2="+arg2);
    };
    ```

## Semplice progetto di esempio

Bisogna creare un primo file **package.json** che contenga:

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

Poi creare un secondo file **hello-world-server.js** che contenga:

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

Ora non resta che provare il server, lanciando il comando:

```bash
npm start
```

E il risultato si vede direttamente su http://127.0.0.1:1337/.

## Test

Node.JS permette di realizzare test avanzati; per farlo si inizia installando le dipendenze:

```bash
npm install -g karma
npm install -g mocha
npm install karma-mocha --save-dev
```

Esempio in arrivo...

## Versionamento

Uso di Git come strumento di versionamento, installazione delle dipendenze:

```bash
sudo apt-get install git
Git to path (;C:\Program Files (x86)\Git\bin;C:\Program Files (x86)\Git\cmd)
git config --global user.name "NAME"
git config --global user.email "NAME@GMAIL.COM"
(git config --global credential.helper cache)
(git config --global credential.helper 'cache --timeout=3600')
```

## Utili

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

Collaborativo:

```bash
npm install hackify -g
cd /project_name
hackify
```

Livereload senza gruntfile:

```bash
npm install -g livereload
npm install livereload --save
npm install express-livereload --save
```

Mail (https://github.com/andris9/nodemailer):

```bash
npm install nodemailer --save
```

[1]: #!reminders/installation-de-node-js
