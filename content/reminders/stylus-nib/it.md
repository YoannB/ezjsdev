---
title: "I vantaggi di Stylus / Nib"
slug: i-vantaggi-di-stylus-nib
date: 2014-03-23
description: "Alcuni punti di forza di Stylus / Nib."
---

## Installazione e configurazione

Vedi l'articolo [qui][1] per usare Stylus con Angular-fullstack.

## Iconic

Le immagini per le icone sono superate da un po' di tempo sul Web; il loro sostituto: i **font**.

Personalizzabili come il testo, se ne possono cambiare al volo **colore** e **dimensione** e, a seconda del browser, lo zoom è ottimizzato in modo da non vedere aliasing.

Inoltre la compatibilità con i browser è eccellente, anche con le versioni più vecchie di Internet Explorer.

I font Iconic di nib sono simili ai **glyphicons** di [Bootstrap][2] o di [font-awesome][3].

## I prefissi **vendor**

Vengono generati automaticamente quando il task stylus genera il CSS.

**Esempio:** animare i glyphicons di Bootstrap aggiungendo la classe **spin**

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

Diventa, una volta generato da Stylus/Nib

`.css`

```css
.spin{-webkit-animation:spin 2s infinite linear;-moz-animation:spin 2s infinite linear;-o-animation:spin 2s infinite linear;-ms-animation:spin 2s infinite linear;animation:spin 2s infinite linear}

@-moz-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-o-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-ms-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}
```

Piuttosto potente: non bisogna più pensare ai prefissi di ogni proprietà CSS...

[1]: /it/articoli/sostituire-compass-con-stylus-nib
[2]: http://getbootstrap.com/components/
[3]: http://fortawesome.github.io/Font-Awesome/icons/
