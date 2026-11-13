---
title: "Homogénéiser les navigateurs"
slug: homogeneiser-les-navigateurs
date: 2014-09-05
description: "Pense-bête pour homogénéiser les navigateurs."
---

Pour bien commencer le développement d'un site web, il faut commencer par les navigateurs cibles et le plus simple est de rendre l'affichage dans chaque navigateur homogène.

## Les polyfills JavaScript

Les polyfills sont un ensemble de fonctions permettant de simuler sur un navigateur ancien des fonctionnalités qui ne sont pas nativement disponibles.

Parmi les plus utiles :

- [json3][1] : pour décoder et parser du JSON.
- [es5][2] : implémentation des fonctions d'EcmaScript 5.
- [Respond][3] : simulation des media queries à l'aide de window.onresize.

Dans le cas d'un projet Node.JS, voici la configuration avec [Bower][bower] (dans bower.json) :

```json
"json3": "~3.2.6",
"es5-shim": "~2.1.0",
"respond": "~1.4.2"
```

> Note : il faut également rajouter la dépendance **es5-sham** à la main en dessous de la ligne pour **es5-shim** :
>
> ```html
> <script src="/bower_components/es5-shim/es5-shim.js"></script>
> <script src="/bower_components/es5-shim/es5-sham.js"></script>
> ```

## Reset CSS

Le reset CSS est nécessaire pour réinitialiser à 0 la valeur de certains éléments HTML afin d'avoir un rendu plus proche sur les différents navigateurs.

Selon le projet, il y a plusieurs possibilités pour inclure le reset CSS :

- avec un framework CSS (inclusion automatique) : [Bootstrap][4], [Pure][5], [Knacss][6], ...
- avec un fichier .css de reset (à rajouter) : [Normalize.css][7], [Reset CSS d'Eric Meyer][8], [YUI CSS reset][9], ...
- avec Node.JS et Stylus : [Nib][10], en choisissant parmi les resets disponibles :
    - `global-reset()`
    - `nested-reset()`
    - `reset-font()`
    - `reset-box-model()`
    - `reset-body()`
    - `reset-table()`
    - `reset-table-cell()`
    - `reset-html5()`

## HTML

Ajouter à la fin du **head** de la page les lignes suivantes :

```html
<!-- html 5 new elements -->
<!--[if lt IE 9]><script>"abbr,article,footer,header,nav,section,time".replace(/\w+/g,function(t){document.createElement(t);});</script><![endif]-->
```

> Celles-ci permettent d'ajouter les nouvelles balises au document HTML.

[bower]: /pense-betes/grunt-yo-bower-yeoman
[1]: http://bestiejs.github.io/json3/
[2]: https://github.com/es-shims/es5-shim
[3]: https://github.com/scottjehl/Respond
[4]: http://getbootstrap.com/css/
[5]: http://purecss.io/
[6]: http://www.knacss.com/
[7]: https://github.com/necolas/normalize.css
[8]: http://meyerweb.com/eric/tools/css/reset/
[9]: http://yuilibrary.com/yui/docs/cssreset/
[10]: http://visionmedia.github.io/nib/
