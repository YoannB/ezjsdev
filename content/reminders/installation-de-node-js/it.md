---
title: "Installazione di Node.js"
slug: installazione-di-node-js
date: 2013-12-01
description: "Promemoria per installare Node.JS."
---

## Windows

Seguire la procedura sul sito ufficiale [nodejs.org][1].

## Ubuntu

In un terminale, eseguire le righe seguenti:

```bash
sudo apt-get install npm
sudo npm cache clean -f
sudo npm install -g n
sudo apt-get install curl ( if needed )
sudo n stable
```

> **NOTA:** in caso di errore nel recupero dei pacchetti, due righe utili da eseguire:
>
> Configurare il registro:
>
> ```bash
> npm config set registry http://registry.npmjs.org/
> ```
>
> E se si è dietro un proxy:
>
> ```bash
> git config --global url."https://".insteadOf git://
> ```

## Per installare le dipendenze, nella cartella del progetto

```bash
sudo npm install
```

## Per avviare l'applicazione node 'app'

```bash
node app.js
```

Oppure, se in package.json si definisce il comando "start"

```json
"scripts" : {
  "start" : "node app.js"
}
```

Basta fare

```bash
npm start
```

> **Installazione senza SUDO:** si consiglia di installare Node.JS in modo da non dover usare **sudo** a ogni comando.
>
> Cambiare i permessi dell'installazione locale:
>
> ```bash
> sudo chown -R $USER /usr/local
> ```
>
> e se la cartella esiste:
>
> ```bash
> sudo chown -R $USER /usr/lib/node_modules/
> ```

[1]: http://nodejs.org/
