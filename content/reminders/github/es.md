---
title: "Recordatorio de GitHub"
slug: recordatorio-github
date: 2014-05-25
description: "Recordatorio de los comandos git útiles."
---

## Empezar a trabajar

Después de crear un nuevo repositorio en GitHub, para traerlo a tu espacio de trabajo basta con ejecutar, en el lugar donde quieres que se cree la carpeta:

```bash
git clone https://github.com/[your.github.username]/[your.new.repository]
```

## Los comandos útiles

- **Config**: configurar tu identidad git

    ```
    Run

      git config --global user.email "you@example.com"
      git config --global user.name "Your Name"

    to set your account's default identity.
    Omit --global to set the identity only in this repository.
    ```

- **Merge**: traer en local los cambios del espacio de trabajo

    ```bash
    git pull
    ```

    o

    ```bash
    git pull origin master
    ```

- **Switch branch**: pasar de una rama a otra

    ```bash
    git checkout mybranch
    ```

- **Copy branch modifications to master**: fusionar la rama con el tronco

    ```bash
    git merge gh-pages
    ```

- **Commit**: hacer el commit de los archivos en el repositorio de GitHub

    ```bash
    git commit --all
    ```

    o

    ```bash
    git commit -a -m "comentario"
    ```

    Después enviar el commit:

    ```bash
    git push origin master
    ```

- **Remove**: si un archivo se subió a git pero ahora está en el .gitignore

    ```bash
    git rm --cached <file_name>
    ```

> **Importante:** para evitar conflictos durante un merge, empezar con un:
>
> ```bash
> git status
> ```
>
> Después, abrir cada archivo y resolver los conflictos; luego ya puedes hacer el commit.

> **Truco:** cada comando puede recibir como parámetros la URL del proyecto y el nombre de la rama:
>
> ```bash
> git {pull,commit,push} {options} https://github.com/[your.github.username]/[your.new.repository] [branch.name]
> ```

## Crear la rama [**gh-pages**][1]

Para crear la rama gh-pages, clonar el repositorio en un directorio nuevo y, dentro de él:

1. Creación de la nueva rama:

    ```bash
    git checkout --orphan gh-pages
    ```

2. Preparación del commit con su comentario:

    ```bash
    git commit -a -m "First gh-pages commit"
    ```

3. Envío de la versión gh-pages:

    ```bash
    git push origin gh-pages
    ```

Listo, tu sitio debería estar accesible en la dirección `http://[your.github.username].github.io/[your.new.repository]`.

> Más información sobre la creación manual de las páginas [aquí][3].

## Crear una etiqueta (tag)

Para crear la etiqueta 1.0.0, en el repositorio **master**:

1. Ver las etiquetas:

    ```bash
    git tag
    ```

2. Creación de la etiqueta 1.0.0 con su comentario:

    ```bash
    git tag -a 1.0.0 -m "1.0.0"
    ```

3. Envío de las etiquetas:

    ```bash
    git push --tags
    ```

> Útil al crear paquetes bower, instrucciones [aquí][4].

[1]: https://pages.github.com/
[3]: https://help.github.com/articles/creating-project-pages-manually
[4]: http://bower.io/docs/creating-packages/
