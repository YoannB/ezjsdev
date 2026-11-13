---
title: "Creare un pacchetto bower"
slug: creare-un-pacchetto-bower
date: 2015-03-30
description: "Promemoria per creare un pacchetto bower."
---

## Creare un progetto

Aggiungere il manifesto bower.json:

```bash
bower init
```

Oppure creare il file bower.json con questo contenuto:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "path/to/main.css",
  "description": "description...",
  "keywords": [
    "keyword"
  ],
  "ignore": [
    ".jshintrc",
    "**/*.txt"
  ],
  "dependencies": {
    "<name>": "<version>",
    "<name>": "<folder>",
    "<name>": "<package>"
  },
  "devDependencies": {
    "<test-framework-name>": "<version>"
  }
}
```

## Creare il progetto su GitHub

Vedi il promemoria [GitHub][github].

> Non dimenticare di creare il tag corrispondente del progetto:
>
> ```bash
> git tag -a 1.0.0 -m "1.0.0"
> git push --tags
> ```

## Registrare il pacchetto

```bash
bower register <my-package-name> <git-endpoint>

# per esempio
bower register example git://github.com/user/example.git
```

## Rimuovere un pacchetto

```bash
bower unregister <package>
```

Oppure

```bash
curl -X DELETE "https://bower.herokuapp.com/packages/<package>?access_token=<token>"
```

> Maggiori informazioni sul sito di [bower][0].

[0]: http://bower.io/docs/creating-packages/
[github]: /it/promemoria/promemoria-github
