---
title: "Angular FullStack"
slug: angular-fullstack
date: 2014-03-10
description: "Promemoria per iniziare con Angular FullStack."
---

- Installare [Node.JS][1]

- Installare [Grunt/Yo/Bower][2]

- Installare il generatore angular-fullstack

    ```bash
    sudo npm install generator-angular-fullstack
    ```

> **Nota:** per altri generatori, vedi il promemoria sui [generatori][3] più in voga

Struttura del progetto generato:

![Struttura](/reminders/angular-js/angular_struc.png)

Una volta installato il progetto, è necessario scaricare le dipendenze eseguendo il comando

```bash
bower install
```

> **Nota:** in caso di installazione globale, può comparire un messaggio bloccante; con 'bower install --allow-root' il comando va a buon fine

I diversi comandi definiti da **grunt** sono:

- avvio dell'applicazione in modalità sviluppo

    ```bash
    grunt serve
    ```

- build e avvio in modalità produzione

    ```bash
    grunt serve:dist
    ```

- generare la distribuzione del progetto

    ```bash
    grunt build
    ```

Per avviare la distribuzione, andare nella cartella 'dist' ed eseguire il comando

```bash
NODE_ENV=production node server.js
```

Test con karma:

**Nota:** serve un file karma.conf.js, quindi se non è stato generato bisognerà aggiungerne uno ([esempio][4])

- Avvio dei test lato server

    ```bash
    grunt test:server
    ```

- Avvio dei test lato client

    ```bash
    grunt test:client
    ```

[1]: /it/promemoria/installazione-di-node-js
[2]: /it/promemoria/grunt-yo-bower-yeoman
[3]: /it/promemoria/generatori-yeoman
[4]: https://raw.githubusercontent.com/YoannB/fullstack-demo/master/karma.conf.js
