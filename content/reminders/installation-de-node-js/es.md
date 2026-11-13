---
title: "Instalación de Node.js"
slug: instalacion-de-node-js
date: 2013-12-01
description: "Recordatorio para instalar Node.JS."
---

## Windows

Seguir el procedimiento del sitio oficial [nodejs.org][1].

## Ubuntu

En un terminal, ejecutar las siguientes líneas:

```bash
sudo apt-get install npm
sudo npm cache clean -f
sudo npm install -g n
sudo apt-get install curl ( if needed )
sudo n stable
```

> **NOTA:** si hay errores al descargar paquetes, dos líneas útiles que ejecutar:
>
> Configurar el registro:
>
> ```bash
> npm config set registry http://registry.npmjs.org/
> ```
>
> Y si estás detrás de un proxy:
>
> ```bash
> git config --global url."https://".insteadOf git://
> ```

## Para instalar las dependencias, en la carpeta del proyecto

```bash
sudo npm install
```

## Para arrancar la aplicación node 'app'

```bash
node app.js
```

O, si en package.json se define el comando "start"

```json
"scripts" : {
  "start" : "node app.js"
}
```

Basta con hacer

```bash
npm start
```

> **Instalación sin SUDO:** se recomienda instalar Node.JS de forma que no haya que usar **sudo** en cada comando.
>
> Cambiar los permisos de la instalación local:
>
> ```bash
> sudo chown -R $USER /usr/local
> ```
>
> y si el directorio existe:
>
> ```bash
> sudo chown -R $USER /usr/lib/node_modules/
> ```

[1]: http://nodejs.org/
