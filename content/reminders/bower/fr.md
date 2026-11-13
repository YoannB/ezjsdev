---
title: "Créer un package bower"
slug: creer-un-package-bower
date: 2015-03-30
description: "Pense-bête pour créer un package bower."
---

## Créer un projet

Ajouter le manifeste bower.json :

```bash
bower init
```

Ou créer le fichier bower.json avec le contenu :

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

## Créer le projet sur GitHub

Voir le pense-bête [GitHub][github].

> Ne pas oublier de créer le tag correspondant du projet :
>
> ```bash
> git tag -a 1.0.0 -m "1.0.0"
> git push --tags
> ```

## Ajouter le package

```bash
bower register <my-package-name> <git-endpoint>

# par exemple
bower register example git://github.com/user/example.git
```

## Supprimer un package

```bash
bower unregister <package>
```

Ou

```bash
curl -X DELETE "https://bower.herokuapp.com/packages/<package>?access_token=<token>"
```

> Plus d'informations sur le site de [bower][0].

[0]: http://bower.io/docs/creating-packages/
[github]: /pense-betes/pense-bete-github
