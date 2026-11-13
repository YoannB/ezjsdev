---
title: "Die Vorteile von Stylus / Nib"
slug: die-vorteile-von-stylus-nib
date: 2014-03-23
description: "Einige Stärken von Stylus / Nib."
---

## Installation & Konfiguration

Siehe den Artikel [hier][1], um Stylus mit Angular-fullstack zu verwenden.

## Iconic

Bilder für Icons sind im Web seit einiger Zeit überholt; ihr Ersatz: **Fonts**.

Sie lassen sich wie Text anpassen: **Farbe** und **Größe** können im Handumdrehen geändert werden, und je nach Browser ist das Zoomen so optimiert, dass kein Aliasing zu sehen ist.

Außerdem ist die Browserkompatibilität hervorragend, selbst mit den ältesten Internet-Explorer-Versionen.

Die Iconic-Fonts von nib ähneln den **Glyphicons** von [Bootstrap][2] oder [font-awesome][3].

## **Vendor**-Präfixe

Sie werden automatisch erzeugt, wenn der stylus-Task das CSS generiert.

**Beispiel:** die Glyphicons von Bootstrap durch Hinzufügen der Klasse **spin** animieren

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

Wird nach der Generierung durch Stylus/Nib zu

`.css`

```css
.spin{-webkit-animation:spin 2s infinite linear;-moz-animation:spin 2s infinite linear;-o-animation:spin 2s infinite linear;-ms-animation:spin 2s infinite linear;animation:spin 2s infinite linear}

@-moz-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-o-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-ms-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}
```

Ziemlich mächtig: Man muss nicht mehr an die Präfixe jeder CSS-Eigenschaft denken...

[1]: /de/artikel/compass-durch-stylus-nib-ersetzen
[2]: http://getbootstrap.com/components/
[3]: http://fortawesome.github.io/Font-Awesome/icons/
