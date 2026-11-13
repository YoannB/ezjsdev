---
title: "Começar com Node.JS"
slug: comecar-com-node-js
date: 2013-12-01
description: "Como começar com Node.JS."
---

## Instalação

Ver o lembrete [nodejs][1].

## Utilização

Primeiros passos com os módulos

- exemplo de módulo de configuração (objeto JSON):

    ```javascript
    var conf = require('./config');
    // conf.prop1
    // conf.prop2
    /* arquivo /config/index.js ou /PATH/config.js */
    module.exports = {
        prop1:"val1",
        prop2:"val2"
    };
    ```

- exemplo de módulo estilo servidor:

    ```javascript
    var server = require('./server');
    server.newMethod();
    /* arquivo /server/index.js ou /PATH/server.js */
    var app = express();
    app.newMethod = function () {

    };
    module.exports = app;
    ```

- exemplo complexo com dependência:

    ```javascript
    var db = require('./db');
    var handler = require('./handler')(db);
    /* arquivo /handler/index.js ou /PATH/handler.js */
    module.exports = function (db) {
        console.log("db="+db);
    };
    ```

- exemplo de módulo utilitário:

    ```javascript
    var utils = require('./utils');
    /* arquivo /utils/index.js ou /PATH/utils.js */
    exports.method1 = function (arg) {
        console.log("arg="+arg);
    };
    exports.method2 = function (arg1,arg2) {
        console.log("arg1="+arg1+" & arg2="+arg2);
    };
    ```

## Projeto simples de exemplo

É preciso criar um primeiro arquivo **package.json** contendo:

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

Em seguida, criar um segundo arquivo **hello-world-server.js** contendo:

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

Depois, só falta testar o servidor, executando o comando:

```bash
npm start
```

E o resultado pode ser visto diretamente em http://127.0.0.1:1337/.

## Testes

O Node.JS permite fazer testes avançados; para isso, começamos instalando as dependências:

```bash
npm install -g karma
npm install -g mocha
npm install karma-mocha --save-dev
```

Exemplo em breve...

## Versionamento

Uso do Git como ferramenta de versionamento, instalação das dependências:

```bash
sudo apt-get install git
Git to path (;C:\Program Files (x86)\Git\bin;C:\Program Files (x86)\Git\cmd)
git config --global user.name "NAME"
git config --global user.email "NAME@GMAIL.COM"
(git config --global credential.helper cache)
(git config --global credential.helper 'cache --timeout=3600')
```

## Úteis

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

Livereload sem gruntfile:

```bash
npm install -g livereload
npm install livereload --save
npm install express-livereload --save
```

E-mail (https://github.com/andris9/nodemailer):

```bash
npm install nodemailer --save
```

[1]: #!reminders/installation-de-node-js
