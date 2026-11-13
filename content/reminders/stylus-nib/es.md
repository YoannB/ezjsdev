---
title: "Las ventajas de Stylus / Nib"
slug: las-ventajas-de-stylus-nib
date: 2014-03-23
description: "Algunas bazas de Stylus / Nib."
---

## Instalación y configuración

Ver el artículo [aquí][1] para usar Stylus con Angular-fullstack.

## Iconic

Las imágenes para los iconos están superadas desde hace tiempo en la Web; su sustituto: las **fuentes**.

Personalizables igual que el texto, se puede cambiar su **color** y su **tamaño** al vuelo y, según el navegador, el zoom sobre ellas está optimizado para que no se vea aliasing.

Además, la compatibilidad con los navegadores es excelente, incluso en las versiones más antiguas de Internet Explorer.

Las fuentes Iconic de nib son similares a los **glyphicons** de [Bootstrap][2] o de [font-awesome][3].

## Los prefijos **vendor**

Se generan automáticamente cuando la tarea stylus genera el CSS.

**Ejemplo:** animar los glyphicons de Bootstrap añadiendo la clase **spin**

`.styl`

```stylus
.spin
  animation spin 2s infinite linear

@keyframes spin
  from
    transform rotate(0deg)
  to
    transform rotate(360deg)
```

Se convierte, una vez generado por Stylus/Nib, en

`.css`

```css
.spin{-webkit-animation:spin 2s infinite linear;-moz-animation:spin 2s infinite linear;-o-animation:spin 2s infinite linear;-ms-animation:spin 2s infinite linear;animation:spin 2s infinite linear}

@-moz-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-o-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-ms-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}
```

Bastante potente: ya no hay que pensar en los prefijos de cada propiedad CSS...

[1]: /es/articulos/reemplazar-compass-por-stylus-nib
[2]: http://getbootstrap.com/components/
[3]: http://fortawesome.github.io/Font-Awesome/icons/
