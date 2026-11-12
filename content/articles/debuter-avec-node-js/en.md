---
title: "Getting started with Node.JS"
slug: getting-started-with-node-js
date: 2013-12-01
description: "How to get started with Node.JS."
---

## Installation

See the [nodejs][1] reminder.

## Usage

Getting to grips with modules

- example of a configuration module (JSON object):

    ```javascript
    var conf = require('./config');
    // conf.prop1
    // conf.prop2
    /* file /config/index.js or /PATH/config.js */
    module.exports = {
        prop1:"val1",
        prop2:"val2"
    };
    ```

- example of a server-style module:

    ```javascript
    var server = require('./server');
    server.newMethod();
    /* file /server/index.js or /PATH/server.js */
    var app = express();
    app.newMethod = function () {

    };
    module.exports = app;
    ```

- complex example with a dependency:

    ```javascript
    var db = require('./db');
    var handler = require('./handler')(db);
    /* file /handler/index.js or /PATH/handler.js */
    module.exports = function (db) {
        console.log("db="+db);
    };
    ```

- example of a utility module:

    ```javascript
    var utils = require('./utils');
    /* file /utils/index.js or /PATH/utils.js */
    exports.method1 = function (arg) {
        console.log("arg="+arg);
    };
    exports.method2 = function (arg1,arg2) {
        console.log("arg1="+arg1+" & arg2="+arg2);
    };
    ```

## Simple example project

First create a **package.json** file containing:

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

Then create a second file, **hello-world-server.js**, containing:

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

All that is left is to test the server by running the command:

```shell
npm start
```

And the result can be seen right away at http://127.0.0.1:1337/.

## Tests

Node.JS makes advanced testing possible; to do so, start by installing the dependencies:

```shell
npm install -g karma
npm install -g mocha
npm install karma-mocha --save-dev
```

Example coming soon...

## Versioning

Using Git as the versioning tool, installing the dependencies:

```shell
sudo apt-get install git
Git to path (;C:\Program Files (x86)\Git\bin;C:\Program Files (x86)\Git\cmd)
git config --global user.name "NAME"
git config --global user.email "NAME@GMAIL.COM"
(git config --global credential.helper cache)
(git config --global credential.helper 'cache --timeout=3600')
```

## Useful

Mysql:

```shell
sudo npm -g install node-mysql
```

MongoDB:

```shell
sudo apt-get install mongodb
```

Inliner:

```shell
sudo npm -g install inliner
sudo inliner --verbose --nocompress http://localhost/ > inline.html
```

Collaborative:

```shell
npm install hackify -g
cd /project_name
hackify
```

Livereload without a gruntfile:

```shell
npm install -g livereload
npm install livereload --save
npm install express-livereload --save
```

Mail (https://github.com/andris9/nodemailer):

```shell
npm install nodemailer --save
```

[1]: #!reminders/installation-de-node-js
