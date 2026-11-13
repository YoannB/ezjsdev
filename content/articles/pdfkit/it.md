---
title: "Generare PDF con Node.JS"
slug: generare-pdf-con-node-js
date: 2014-09-12
description: "Generare PDF con PdfKit e Node.JS."
---

Per generare i PDF ho scelto la libreria [PdfKit][1] per la sua semplicità d'uso (il pdf si programma come un oggetto Canvas HTML5), ma soprattutto perché genera pdf conformi allo standard del [w3c][2].

## Installazione

Installare il modulo (versione attuale 0.7.0):

```bash
npm install pdfkit
```

oppure con l'opzione **--save** per salvare automaticamente la dipendenza nel file package.json:

```bash
npm install pdfkit --save
```

> Nota: è possibile usare la libreria in un browser senza lato server (richiede un browser recente, vedi il sito di [PdfKit][1])

## Primi passi

In un file **pdf.js** si scrive il contenuto del pdf:

```javascript
'use strict';

var PDFDocument = require('pdfkit');

exports.sample = function (res,callback) {
  // il costruttore di PdfKit accetta diversi parametri:
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

  // posizionare un titolo al centro della pagina
  var text = 'Node.JS !';
  doc.fontSize(25)
      .text(text, (doc.page.width - doc.widthOfString(text)) / 2, (doc.page.height - doc.heightOfString(text)) / 2);

  // aggiungere una nuova pagina
  doc.addPage();

  // disegnare un triangolo
  doc.save()
      .moveTo(100, 150)
      .lineTo(100, 250)
      .lineTo(200, 250)
      .fill('#FF3300');

  // aggiungere un link esterno
  var width = doc.widthOfString('This is a link!');
  var height = doc.currentLineHeight();
  doc.fillColor('blue')
      .text('This is a link!', 20, 20, {underline:true})
      .link(20, 20, width, height, 'http://google.com/');

  // inviare il PDF in stream nella risposta
  doc.pipe(res);
  doc.end();

  // aggiunta di un evento di ritorno
  var that = this;
  doc.once('end', function () {
      (callback || function () {}).call(that);
  });
};
```

## Nel browser, [demo live][3]:

Basta copiare e incollare il codice qui sotto nell'editor (lato sinistro della pagina) per vedere il rendering del pdf in tempo reale (lato destro della pagina).

```javascript
var doc = new PDFDocument();

// posizionare un titolo al centro della pagina
var text = 'Node.JS !';
doc.fontSize(25)
  .text(text, (doc.page.width - doc.widthOfString(text)) / 2, (doc.page.height - doc.heightOfString(text)) / 2);

// aggiungere una nuova pagina
doc.addPage();

// disegnare un triangolo
doc.save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

// aggiungere un link esterno
var width = doc.widthOfString('This is a link!');
var height = doc.currentLineHeight();
doc.fillColor('blue')
  .text('This is a link!', 20, 20, {underline:true})
  .link(20, 20, width, height, 'http://google.com/');

// inviare il PDF in stream in un oggetto HTML5 **blob**
var stream = doc.pipe(blobStream());
doc.end();

stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});
```

[1]: http://pdfkit.org/
[2]: http://www.w3.org/TR/WCAG20-TECHS/pdf.html
[3]: http://pdfkit.org/demo/browser.html
