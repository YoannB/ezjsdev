---
title: "Blog para GitHub"
slug: blog-para-github
date: 2014-05-25
description: "Tutorial para crear un blog que se puede alojar en las páginas de GitHub."
---

Artículo original [aquí][original]

Este es un blog para las páginas de GitHub. Basta con hacer un [fork][0] del proyecto y modificar los archivos de configuración para tener **tu** blog.

> Primer paso: en el archivo **index.html** debes sustituir la línea

```html
 <base href="http://yoannb.github.io/gh-blog/">
```

Por la url de tus gh-pages:

```html
 <base href="http://[your.github.username].github.io/gh-blog/">
```

Para más información sobre las gh-pages, ve [allí][gh-pages] y/o mira mi [recordatorio][reminder].

## Estructura para personalizar **tu** blog:

Todos los archivos que tienes que modificar están en el directorio **config**:

```
config
|---json
    |---site.json       -> configuración del sitio (título,logo,foto,descripción...)
    |---skills.json     -> tus competencias, mostradas en la portada y en el cv
    |---cv.json         -> tus experiencias y formación
    |---blog.json       -> la lista de artículos del blog
|---md
    |---blog            -> artículos .md
|---styles
    |---theme.css       -> el css para la personalización gráfica
```

## El archivo **site.json**

Es el archivo principal, donde puedes activar o desactivar cada parte del sitio:

```json
"skills":true,
"cv":true,
"blog":true
```

- Si no quieres **competencias (skills)** en la portada y el CV, basta con poner el atributo a false.
- Si no quieres ver el menú de **cv** y / o **blog**, basta con poner el atributo a false.
- Si no quieres **foto (picture)** en la portada, basta con eliminar el atributo **picture**; lo mismo para el atributo **descriptions**.

## Personalizar tu foto

Tienes tres opciones para tu foto:

1. Una imagen en el directorio **images**:

    ```json
    "photo": {
        "img":"images/me.jpg"
    }
    ```

2. Tu **usuario de GitHub**:

    ```json
    "photo": {
        "github":"github"
    }
    ```

3. O tu **dirección de correo de gravatar**:

    ```json
    "photo": {
        "gravatar":"github@mail.com"
    }
    ```

## Tu CV

Solo tienes que editar el archivo **cv.json**.

## Tus competencias

Del mismo modo, solo tienes que editar el archivo **skills.json**.

## Escribir un artículo

Añadir un elemento al archivo **blog.json** como en el siguiente ejemplo:

```json
{
    "id" : "the-id",
    "title": "El título",
    "date" : "05/05/2014", // fecha en formato estadounidense MM/dd/yyyy
    "file" : "config/md/blog/2014/05/my.blog.md", // la ruta del archivo md
    "visible" : false // usar visible para mostrar un artículo solo cuando esté listo
}
```

Crear un nuevo archivo en el lugar que hayas indicado y redactar tu artículo.

## Configuración de Disqus

Ir al [sitio][4] y registrar una cuenta nueva si quieres usar disqus en tu blog.

Y añadir tu nuevo identificador de cuenta en el archivo **site.json**:

```json
"disqus" : {
    "shortname":"username"
},
```

## Personalizar la visualización del Markdown

Puedes cambiar el estilo utilizado modificando el archivo css en el atributo **cssMarkdown**:

```json
"cssMarkdown" : "github.css",
```

> **Nota**: la lista de archivos css disponibles está en la carpeta **/bower_components/highlightjs/styles/**.

## Más información sobre el proyecto

- Uso de [Angular.JS][1] versión 1.2.15.
- Uso de [Bootstrap CSS][2] para los estilos.
- Uso de [Markdown][3] para los artículos.
- Uso de [Disqus][4] para los comentarios.
- Personalización mediante archivos JSON.
- Generado con Node.JS y Grunt/Bower/Yo.

## Fuentes

Las fuentes del proyecto están [aquí][5] y la demo está [aquí][6].

[original]: https://github.com/YoannB/gh-blog/blob/master/README.md
[gh-pages]: https://pages.github.com/
[reminder]: #!reminders/github
[0]: https://github.com/YoannB/gh-blog/fork
[1]: https://angularjs.org/
[2]: http://getbootstrap.com/css/
[3]: http://fr.wikipedia.org/wiki/Markdown
[4]: http://disqus.com/
[5]: https://github.com/YoannB/gh-blog
[6]: http://yoannb.github.io/gh-blog
