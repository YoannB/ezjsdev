---
title: "Clever-cloud y aplicación Node.JS"
slug: clever-cloud-y-aplicacion-node-js
date: 2014-10-05
description: "Tutorial para desplegar tu primera aplicación Node.JS en Clever-cloud."
---

## Registro

Ve al sitio de [clever-cloud][1] para registrarte.

> Para los usuarios de github, basta con conectarse con su cuenta de github para que, además, la clave ssh se copie automáticamente.

> Después de un registro manual, una vez en la página de la [consola][2], en la sección perfil/Claves SSH (en el menú de abajo a la izquierda y luego arriba en la nueva página), hay que introducir la clave pública ssh en el sitio:

```bash
# copiar la clave al portapapeles
xclip -sel clip < ~/.ssh/id_rsa.pub
```

## Pago

Para empezar, elegir la solución básica y seleccionar Node.Js como lenguaje.

> por defecto, el coste estimado del sitio es de 14,40 €/mes con 1 CPU y 1 GB de ram.

## Desplegar tu aplicación

Con Node.Js, todo se hace automáticamente siempre que el proyecto esté configurado de la siguiente manera:

- usar el puerto 8080
- en el archivo package.json, indicar:
    1. el "name"
    2. la "version"
    3. la etiqueta "scripts" con el comando "start" que arranca el servidor
    4. todas las dependencias necesarias para el proyecto

Ejemplo de package.json válido con un servidor Express 4.9.5:

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

> Para arrancar el entorno en modo **producción**:

```json
"scripts": {
   "start": "NODE_ENV=production node server.js"
 }
```

## Subir tu aplicación a Clever-cloud

Nada más sencillo: Clever-cloud usa **git**. Al elegir el lenguaje, antes de configurar la clave ssh, se te da un enlace **git remote**:

```bash
git remote add clever git+ssh://git@push.par.clever-cloud.com/app_[id_de_tu_app].git
```

En el directorio de tu aplicación, ejecutar el comando anterior (git remote ...).

Si el proyecto aún no es un proyecto **git**, ejecutar `git init`.

Después, si el archivo **.gitignore** de tu proyecto está al día y lo has preparado todo bien, ejecutar los comandos:

```bash
git add .
git commit -m "initial commit"
git push clever master
```

> La aplicación se desplegará automáticamente; para ver el log del servidor, hay que ir a la consola clever-cloud de la aplicación (enlace **Logs**). Si todo va bien, verás las líneas:

```
2014-10-09T16:51:57.062Z (GMT) Successfuly deployed in 1 minute and 5 seconds
2014-10-09T16:51:57.062Z (GMT) Server up
```

> En caso de problema con la clave ssh, el siguiente comando permite cargar la clave en la sesión del terminal:

```bash
ssh-add ~/.ssh/id_rsa
```

[1]: https://www.clever-cloud.com/fr/
[2]: https://console.clever-cloud.com
