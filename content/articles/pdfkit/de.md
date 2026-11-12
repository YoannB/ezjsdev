---
title: "PDFs mit Node.JS erzeugen"
slug: pdfs-mit-node-js-erzeugen
date: 2014-09-12
description: "PDFs mit PdfKit und Node.JS erzeugen."
---

Für die Erzeugung der PDFs habe ich die Bibliothek [PdfKit][1] gewählt, weil sie einfach zu benutzen ist (man programmiert das PDF wie ein HTML5-Canvas-Objekt), vor allem aber, weil sie PDFs gemäß dem [W3C][2]-Standard erzeugt.

## Installation

Das Modul installieren (aktuelle Version 0.7.0):

```
npm install pdfkit
```

oder mit der Option **--save**, um die Abhängigkeit automatisch in der Datei package.json zu speichern:

```
npm install pdfkit --save
```

> Hinweis: Die Bibliothek lässt sich auch ohne Serverseite im Browser verwenden (erfordert einen aktuellen Browser, siehe Website von [PdfKit][1])

## Erste Schritte

In einer Datei **pdf.js** programmiert man den Inhalt des PDFs:

```javascript
'use strict';

var PDFDocument = require('pdfkit');

exports.sample = function (res,callback) {
  // der Konstruktor von PdfKit akzeptiert mehrere Parameter:
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

  // einen Titel in der Mitte der Seite platzieren
  var text = 'Node.JS !';
  doc.fontSize(25)
      .text(text, (doc.page.width - doc.widthOfString(text)) / 2, (doc.page.height - doc.heightOfString(text)) / 2);

  // eine neue Seite hinzufügen
  doc.addPage();

  // ein Dreieck zeichnen
  doc.save()
      .moveTo(100, 150)
      .lineTo(100, 250)
      .lineTo(200, 250)
      .fill('#FF3300');

  // einen externen Link hinzufügen
  var width = doc.widthOfString('This is a link!');
  var height = doc.currentLineHeight();
  doc.fillColor('blue')
      .text('This is a link!', 20, 20, {underline:true})
      .link(20, 20, width, height, 'http://google.com/');

  // das PDF in die Antwort streamen
  doc.pipe(res);
  doc.end();

  // ein Rückmeldungs-Event hinzufügen
  var that = this;
  doc.once('end', function () {
      (callback || function () {}).call(that);
  });
};
```

## Im Browser, [Live-Demo][3]:

Einfach den folgenden Code in den Editor (linke Seite der Seite) kopieren, um das PDF in Echtzeit gerendert zu sehen (rechte Seite der Seite).

```javascript
var doc = new PDFDocument();

// einen Titel in der Mitte der Seite platzieren
var text = 'Node.JS !';
doc.fontSize(25)
  .text(text, (doc.page.width - doc.widthOfString(text)) / 2, (doc.page.height - doc.heightOfString(text)) / 2);

// eine neue Seite hinzufügen
doc.addPage();

// ein Dreieck zeichnen
doc.save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

// einen externen Link hinzufügen
var width = doc.widthOfString('This is a link!');
var height = doc.currentLineHeight();
doc.fillColor('blue')
  .text('This is a link!', 20, 20, {underline:true})
  .link(20, 20, width, height, 'http://google.com/');

// das PDF in ein HTML5-**blob**-Objekt streamen
var stream = doc.pipe(blobStream());
doc.end();

stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});
```

[1]: http://pdfkit.org/
[2]: http://www.w3.org/TR/WCAG20-TECHS/pdf.html
[3]: http://pdfkit.org/demo/browser.html
