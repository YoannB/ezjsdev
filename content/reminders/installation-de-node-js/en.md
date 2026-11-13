---
title: "Installing Node.js"
slug: installing-node-js
date: 2013-12-01
description: "Reminder for installing Node.JS."
---

## Windows

Follow the procedure on the official website [nodejs.org][1].

## Ubuntu

In a terminal, run the following lines:

```bash
sudo apt-get install npm
sudo npm cache clean -f
sudo npm install -g n
sudo apt-get install curl ( if needed )
sudo n stable
```

> **NOTE:** if fetching packages fails, two useful lines to run:
>
> Set the registry:
>
> ```bash
> npm config set registry http://registry.npmjs.org/
> ```
>
> And if you are behind a proxy:
>
> ```bash
> git config --global url."https://".insteadOf git://
> ```

## To install the dependencies, in the project folder

```bash
sudo npm install
```

## To run the node application 'app'

```bash
node app.js
```

Or, if the "start" command is defined in package.json

```json
"scripts" : {
  "start" : "node app.js"
}
```

Just run

```bash
npm start
```

> **Installing without SUDO:** it is recommended to install Node.JS so that you don't have to use **sudo** for every command.
>
> Change the permissions of the local installation:
>
> ```bash
> sudo chown -R $USER /usr/local
> ```
>
> and if the directory exists:
>
> ```bash
> sudo chown -R $USER /usr/lib/node_modules/
> ```

[1]: http://nodejs.org/
