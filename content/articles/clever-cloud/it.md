---
title: "Clever-cloud e applicazione Node.JS"
slug: clever-cloud-e-applicazione-node-js
date: 2014-10-05
description: "Tutorial per pubblicare la tua prima applicazione Node.JS su Clever-cloud."
---

## Registrazione

Vai sul sito di [clever-cloud][1] per registrarti.

> Per gli utenti github basta accedere con il proprio account github per avere, in più, la chiave ssh copiata automaticamente.

> Dopo la registrazione manuale, una volta sulla pagina della [console][2], nella sezione profilo/Chiavi SSH (nel menu in basso a sinistra, poi in alto nella nuova pagina), bisogna inserire la propria chiave pubblica ssh sul sito:

```
# copia della chiave negli appunti
xclip -sel clip < ~/.ssh/id_rsa.pub
```

## Pagamento

Per cominciare, scegliere la soluzione base e selezionare Node.Js come linguaggio.

> di base, il costo stimato del sito è di 14,40 €/mese con 1 CPU e 1 GB di ram.

## Pubblicare la propria applicazione

Con Node.Js tutto avviene automaticamente, a condizione di configurare il progetto nel modo seguente:

- usare la porta 8080
- nel file package.json indicare:
    1. il "name"
    2. la "version"
    3. il tag "scripts" con il comando "start" che avvia il server
    4. tutte le dipendenze necessarie al progetto

Esempio di package.json valido con server Express 4.9.5:

```json
{
  "name": "mon-projet",
  "version": "0.0.1",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "body-parser": "^1.9.0",
    "compression": "^1.1.0",
    "cookie-parser": "^1.3.3",
    "cookie-session": "^1.0.2",
    "ejs": "^0.8.5",
    "ejs-locals": "^1",
    "errorhandler": "^1.2.0",
    "express": "^4.9.5",
    "method-override": "^2.2.0",
    "morgan": "^1.3.2",
    "serve-favicon": "^2.1.5",
    "serve-static": "^1.6.3"
  },
  "engines": {
    "node": ">=0.10.32",
    "npm": "1.2.x"
  }
}
```

> Per avviare l'ambiente in modalità **produzione**:

```
"scripts": {
   "start": "NODE_ENV=production node server.js"
 }
```

## Mettere la propria applicazione su Clever-cloud

Niente di più semplice: Clever-cloud usa **git**. Quando si sceglie il linguaggio, prima di configurare la chiave ssh, viene fornito un link **git remote**:

```
git remote add clever git+ssh://git@push.par.clever-cloud.com/app_[id_della_tua_app].git
```

Nella cartella dell'applicazione, lanciare il comando precedente (git remote ...).

Se il progetto non è ancora un progetto **git**, eseguire `git init`.

Poi, se il file **.gitignore** del progetto è aggiornato e hai preparato tutto per bene, eseguire i comandi:

```
git add .
git commit -m "initial commit"
git push clever master
```

> L'applicazione verrà pubblicata automaticamente; per vedere il log del server bisogna andare sulla console clever-cloud dell'applicazione (link **Logs**). Se tutto va bene, vedrai le righe:

```
2014-10-09T16:51:57.062Z (GMT) Successfuly deployed in 1 minute and 5 seconds
2014-10-09T16:51:57.062Z (GMT) Server up
```

> In caso di problemi con la chiave ssh, il comando seguente permette di caricare la chiave nella sessione del terminale:

```
ssh-add ~/.ssh/id_rsa
```

[1]: https://www.clever-cloud.com/fr/
[2]: https://console.clever-cloud.com
