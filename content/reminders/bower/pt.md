---
title: "Criar um pacote bower"
slug: criar-um-pacote-bower
date: 2015-03-30
description: "Lembrete para criar um pacote bower."
---

## Criar um projeto

Adicionar o manifesto bower.json:

```bash
bower init
```

Ou criar o arquivo bower.json com o conteúdo:

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

## Criar o projeto no GitHub

Ver o lembrete do [GitHub][github].

> Não esquecer de criar a tag correspondente do projeto:
>
> ```bash
> git tag -a 1.0.0 -m "1.0.0"
> git push --tags
> ```

## Registrar o pacote

```bash
bower register <my-package-name> <git-endpoint>

# por exemplo
bower register example git://github.com/user/example.git
```

## Remover um pacote

```bash
bower unregister <package>
```

Ou

```bash
curl -X DELETE "https://bower.herokuapp.com/packages/<package>?access_token=<token>"
```

> Mais informações no site do [bower][0].

[0]: http://bower.io/docs/creating-packages/
[github]: /pt/lembretes/lembrete-github
