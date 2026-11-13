---
title: "Mediatomb en Ubuntu"
slug: mediatomb-en-ubuntu
date: 2014-05-08
description: "Recordatorio para crear un servidor Mediatomb (Ubuntu)."
---

**Nota:** este es un recordatorio relacionado con mi trabajo actual, una pequeña cosa que tuve que instalar esta semana para probar el proyecto en el que trabajo.

**Mediatomb** permite crear tu propio servidor DLNA; así se puede, entre otras cosas, ver el contenido del servidor en la tele o en el router multimedia (box).

## Instalación

Documentación oficial [aquí][1]

```bash
sudo apt-get install mediatomb
```

## Configuración

#### Para activar la interfaz de Mediatomb, editar el archivo de configuración:

```bash
sudo gedit /etc/mediatomb/config.xml
```

Cambiar el valor (línea 7)

```xml
<ui enabled="no" show-tooltips="yes">
```

por

```xml
<ui enabled="yes" show-tooltips="yes">
```

Después, reiniciar el servidor:

```bash
sudo service mediatomb restart
```

#### Acceso a la interfaz web

[http://localhost:49152/][2] (con Ubuntu 10.04 y 10.10)

o

[http://localhost:49153/][3] (con Ubuntu 13.04+)

#### Vista previa

![Interfaz web de Mediatomb](/reminders/mediatomb/mediatomb.png)

**Nota**: para purgar la base de datos, eliminar el archivo **/var/lib/mediatomb/mediatomb.db** y después reiniciar mediatomb.

[1]: http://doc.ubuntu-fr.org/mediatomb
[2]: http://localhost:49152/
[3]: http://localhost:49153/
