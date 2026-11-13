---
title: "Ein bower-Paket erstellen"
slug: ein-bower-paket-erstellen
date: 2015-03-30
description: "Merkzettel zum Erstellen eines bower-Pakets."
---

## Ein Projekt anlegen

Das Manifest bower.json hinzufügen:

```bash
bower init
```

Oder die Datei bower.json mit folgendem Inhalt anlegen:

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

## Das Projekt auf GitHub anlegen

Siehe den [GitHub][github]-Merkzettel.

> Nicht vergessen, das passende Tag für das Projekt anzulegen:
>
> ```bash
> git tag -a 1.0.0 -m "1.0.0"
> git push --tags
> ```

## Das Paket registrieren

```bash
bower register <my-package-name> <git-endpoint>

# zum Beispiel
bower register example git://github.com/user/example.git
```

## Ein Paket entfernen

```bash
bower unregister <package>
```

Oder

```bash
curl -X DELETE "https://bower.herokuapp.com/packages/<package>?access_token=<token>"
```

> Mehr Informationen auf der Website von [bower][0].

[0]: http://bower.io/docs/creating-packages/
[github]: /de/merkzettel/github-merkzettel
