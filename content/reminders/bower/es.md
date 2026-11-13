---
title: "Crear un paquete bower"
slug: crear-un-paquete-bower
date: 2015-03-30
description: "Recordatorio para crear un paquete bower."
---

## Crear un proyecto

Añadir el manifiesto bower.json:

```bash
bower init
```

O crear el archivo bower.json con este contenido:

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

## Crear el proyecto en GitHub

Ver el recordatorio de [GitHub][github].

> No olvidar crear la etiqueta (tag) correspondiente del proyecto:
>
> ```bash
> git tag -a 1.0.0 -m "1.0.0"
> git push --tags
> ```

## Registrar el paquete

```bash
bower register <my-package-name> <git-endpoint>

# por ejemplo
bower register example git://github.com/user/example.git
```

## Eliminar un paquete

```bash
bower unregister <package>
```

O

```bash
curl -X DELETE "https://bower.herokuapp.com/packages/<package>?access_token=<token>"
```

> Más información en el sitio de [bower][0].

[0]: http://bower.io/docs/creating-packages/
[github]: /es/recordatorios/recordatorio-github
