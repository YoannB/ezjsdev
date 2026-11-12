---
title: "Générer des pdf avec Node.JS"
slug: generer-des-pdf-avec-node-js
date: 2014-09-12
description: "Générer des PDFs avec PdfKit et Node.JS."
---

Pour la génération des PDFs, j'ai choisi la librairie [PdfKit][1] pour sa simplicité d'utilisation (on code le pdf comme un objet Canvas HTML5) mais surtout car on génère des pdf suivant la norme [w3c][2].

## Installation

Installer le module (version actuelle 0.7.0) :

```
npm install pdfkit
```

ou avec l'option **--save** pour sauvegarder automatiquement la dépendance dans le fichier package.json :

```
npm install pdfkit --save
```

> Note : il est possible d'utiliser la librairie dans un navigateur sans côté serveur (nécessite un navigateur récent, voir sur le site de [PdfKit][1])

## Prise en main

Dans un fichier **pdf.js**, on code le contenu du pdf :

```javascript
'use strict';

var PDFDocument = require('pdfkit');

exports.sample = function (res,callback) {
  // le constructeur de PdfKit accepte plusieurs paramètres :
  var doc = new PDFDocument({
      size: 'legal', //
      margins: {
          top: 70,
          bottom: 70,
          left: 70,
          right: 70
      },
      layout: 'portrait', // landscape
      info: {
          Title: 'Sample pdf', // the title of the document
          Author: 'me', // the name of the author
          Subject: '', // the subject of the document
          Keywords: '', // keywords associated with the document
          CreationDate: '', // the date the document was created (added automatically by PDFKit)
          ModDate: '' // the date the document was last modified*/
      }
  });

  // positionner un titre au centre de la page
  var text = 'Node.JS !';
  doc.fontSize(25)
      .text(text, (doc.page.width - doc.widthOfString(text)) / 2, (doc.page.height - doc.heightOfString(text)) / 2);

  // ajouter une nouvelle page
  doc.addPage();

  // dessiner un triangle
  doc.save()
      .moveTo(100, 150)
      .lineTo(100, 250)
      .lineTo(200, 250)
      .fill('#FF3300');

  // ajouter un lien externe
  var width = doc.widthOfString('This is a link!');
  var height = doc.currentLineHeight();
  doc.fillColor('blue')
      .text('This is a link!', 20, 20, {underline:true})
      .link(20, 20, width, height, 'http://google.com/');

  // stream le PDF dans la réponse
  doc.pipe(res);
  doc.end();

  // ajout d'un événement de retour
  var that = this;
  doc.once('end', function () {
      (callback || function () {}).call(that);
  });
};
```

## Dans le navigateur, [démo live][3] :

Il suffit de copier-coller le code ci-dessous dans l'éditeur (côté gauche de la page) pour voir le rendu en temps réel du pdf (côté droit de la page).

```javascript
var doc = new PDFDocument();

// positionner un titre au centre de la page
var text = 'Node.JS !';
doc.fontSize(25)
  .text(text, (doc.page.width - doc.widthOfString(text)) / 2, (doc.page.height - doc.heightOfString(text)) / 2);

// ajouter une nouvelle page
doc.addPage();

// dessiner un triangle
doc.save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

// ajouter un lien externe
var width = doc.widthOfString('This is a link!');
var height = doc.currentLineHeight();
doc.fillColor('blue')
  .text('This is a link!', 20, 20, {underline:true})
  .link(20, 20, width, height, 'http://google.com/');

// stream le PDF dans un objet HTML5 **blob**
var stream = doc.pipe(blobStream());
doc.end();

stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});
```

[1]: http://pdfkit.org/
[2]: http://www.w3.org/TR/WCAG20-TECHS/pdf.html
[3]: http://pdfkit.org/demo/browser.html
