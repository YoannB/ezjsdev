---
title: "Generar PDF con Node.JS"
slug: generar-pdf-con-node-js
date: 2014-09-12
description: "Generar PDF con PdfKit y Node.JS."
---

Para generar los PDF, elegí la librería [PdfKit][1] por su facilidad de uso (el pdf se programa como un objeto Canvas HTML5), pero sobre todo porque genera pdf conformes a la norma del [w3c][2].

## Instalación

Instalar el módulo (versión actual 0.7.0):

```
npm install pdfkit
```

o con la opción **--save** para guardar automáticamente la dependencia en el archivo package.json:

```
npm install pdfkit --save
```

> Nota: es posible usar la librería en un navegador sin lado servidor (requiere un navegador reciente, ver el sitio de [PdfKit][1])

## Primeros pasos

En un archivo **pdf.js**, se programa el contenido del pdf:

```javascript
'use strict';

var PDFDocument = require('pdfkit');

exports.sample = function (res,callback) {
  // el constructor de PdfKit acepta varios parámetros:
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

  // colocar un título en el centro de la página
  var text = 'Node.JS !';
  doc.fontSize(25)
      .text(text, (doc.page.width - doc.widthOfString(text)) / 2, (doc.page.height - doc.heightOfString(text)) / 2);

  // añadir una página nueva
  doc.addPage();

  // dibujar un triángulo
  doc.save()
      .moveTo(100, 150)
      .lineTo(100, 250)
      .lineTo(200, 250)
      .fill('#FF3300');

  // añadir un enlace externo
  var width = doc.widthOfString('This is a link!');
  var height = doc.currentLineHeight();
  doc.fillColor('blue')
      .text('This is a link!', 20, 20, {underline:true})
      .link(20, 20, width, height, 'http://google.com/');

  // enviar el PDF en stream a la respuesta
  doc.pipe(res);
  doc.end();

  // añadir un evento de retorno
  var that = this;
  doc.once('end', function () {
      (callback || function () {}).call(that);
  });
};
```

## En el navegador, [demo en vivo][3]:

Basta con copiar y pegar el código siguiente en el editor (lado izquierdo de la página) para ver el pdf renderizado en tiempo real (lado derecho de la página).

```javascript
var doc = new PDFDocument();

// colocar un título en el centro de la página
var text = 'Node.JS !';
doc.fontSize(25)
  .text(text, (doc.page.width - doc.widthOfString(text)) / 2, (doc.page.height - doc.heightOfString(text)) / 2);

// añadir una página nueva
doc.addPage();

// dibujar un triángulo
doc.save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

// añadir un enlace externo
var width = doc.widthOfString('This is a link!');
var height = doc.currentLineHeight();
doc.fillColor('blue')
  .text('This is a link!', 20, 20, {underline:true})
  .link(20, 20, width, height, 'http://google.com/');

// enviar el PDF en stream a un objeto HTML5 **blob**
var stream = doc.pipe(blobStream());
doc.end();

stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});
```

[1]: http://pdfkit.org/
[2]: http://www.w3.org/TR/WCAG20-TECHS/pdf.html
[3]: http://pdfkit.org/demo/browser.html
