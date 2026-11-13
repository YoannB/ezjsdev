---
title: "Les + de Stylus / Nib"
slug: les-plus-de-stylus-nib
date: 2014-03-23
description: "Quelques atouts de Stylus / Nib."
---

## Installation & configuration

Voir l'article [ici][1] pour utiliser Stylus avec Angular-fullstack.

## Iconic

Les images pour les icônes sont dépassées depuis quelque temps sur le Web, le remplaçant : les **fonts**.

Customisables de la même façon que le texte, on peut changer leur **couleur** et leur **taille** à la volée et, selon le navigateur utilisé, le zoom sur celles-ci est optimisé de façon à ne pas voir d'aliasing.

De plus, la compatibilité des navigateurs est excellente, même sous les Internet Explorer les plus anciens.

Les fonts Iconic de nib sont semblables aux **glyphicons** de [Bootstrap][2] ou encore de [font-awesome][3].

## Les préfixes **vendor**

Ceux-ci sont automatiquement générés lorsque la tâche stylus génère le CSS.

**Exemple :** animer les glyphicons de Bootstrap en ajoutant la classe **spin**

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

Devient, une fois généré par Stylus/Nib

`.css`

```css
.spin{-webkit-animation:spin 2s infinite linear;-moz-animation:spin 2s infinite linear;-o-animation:spin 2s infinite linear;-ms-animation:spin 2s infinite linear;animation:spin 2s infinite linear}

@-moz-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-o-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-ms-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}
```

Plutôt puissant, cela permet de ne plus penser aux préfixes de chaque propriété CSS...

[1]: /articles/remplacer-compass-par-stylus-nib
[2]: http://getbootstrap.com/components/
[3]: http://fortawesome.github.io/Font-Awesome/icons/
