---
title: "Empezar con Node.JS"
slug: empezar-con-node-js
date: 2013-12-01
description: "Cómo empezar con Node.JS."
---

## Instalación

Ver el recordatorio [nodejs][1].

## Uso

Primeros pasos con los módulos

- ejemplo de módulo de configuración (objeto JSON):

    ```javascript
    var conf = require('./config');
    // conf.prop1
    // conf.prop2
    /* archivo /config/index.js o /PATH/config.js */
    module.exports = {
        prop1:"val1",
        prop2:"val2"
    };
    ```

- ejemplo de módulo de tipo servidor:

    ```javascript
    var server = require('./server');
    server.newMethod();
    /* archivo /server/index.js o /PATH/server.js */
    var app = express();
    app.newMethod = function () {

    };
    module.exports = app;
    ```

- ejemplo complejo con dependencia:

    ```javascript
    var db = require('./db');
    var handler = require('./handler')(db);
    /* archivo /handler/index.js o /PATH/handler.js */
    module.exports = function (db) {
        console.log("db="+db);
    };
    ```

- ejemplo de módulo utilitario:

    ```javascript
    var utils = require('./utils');
    /* archivo /utils/index.js o /PATH/utils.js */
    exports.method1 = function (arg) {
        console.log("arg="+arg);
    };
    exports.method2 = function (arg1,arg2) {
        console.log("arg1="+arg1+" & arg2="+arg2);
    };
    ```

## Proyecto simple de ejemplo

Primero hay que crear un archivo **package.json** que contenga:

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

Después, crear un segundo archivo **hello-world-server.js** que contenga:

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

Luego solo queda probar el servidor, ejecutando el comando:

```bash
npm start
```

Y el resultado se ve directamente en http://127.0.0.1:1337/.

## Tests

Node.JS permite realizar tests avanzados; para ello, se empieza instalando las dependencias:

```bash
npm install -g karma
npm install -g mocha
npm install karma-mocha --save-dev
```

Ejemplo próximamente...

## Control de versiones

Uso de Git como herramienta de control de versiones, instalación de las dependencias:

```bash
sudo apt-get install git
Git to path (;C:\Program Files (x86)\Git\bin;C:\Program Files (x86)\Git\cmd)
git config --global user.name "NAME"
git config --global user.email "NAME@GMAIL.COM"
(git config --global credential.helper cache)
(git config --global credential.helper 'cache --timeout=3600')
```

## Útiles

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

Colaborativo:

```bash
npm install hackify -g
cd /project_name
hackify
```

Livereload sin gruntfile:

```bash
npm install -g livereload
npm install livereload --save
npm install express-livereload --save
```

Correo (https://github.com/andris9/nodemailer):

```bash
npm install nodemailer --save
```

[1]: #!reminders/installation-de-node-js
