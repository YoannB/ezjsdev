---
title: "Gerar PDFs com Node.JS"
slug: gerar-pdfs-com-node-js
date: 2014-09-12
description: "Gerar PDFs com PdfKit e Node.JS."
---

Para gerar os PDFs, escolhi a biblioteca [PdfKit][1] pela sua facilidade de uso (programa-se o pdf como um objeto Canvas HTML5), mas sobretudo porque gera pdfs conformes à norma do [w3c][2].

## Instalação

Instalar o módulo (versão atual 0.7.0):

```bash
npm install pdfkit
```

ou com a opção **--save** para salvar automaticamente a dependência no arquivo package.json:

```bash
npm install pdfkit --save
```

> Nota: é possível usar a biblioteca num navegador sem lado servidor (requer um navegador recente, ver o site do [PdfKit][1])

## Primeiros passos

Num arquivo **pdf.js**, programa-se o conteúdo do pdf:

```javascript
'use strict';

var PDFDocument = require('pdfkit');

exports.sample = function (res,callback) {
  // o construtor do PdfKit aceita vários parâmetros:
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

  // posicionar um título no centro da página
  var text = 'Node.JS !';
  doc.fontSize(25)
      .text(text, (doc.page.width - doc.widthOfString(text)) / 2, (doc.page.height - doc.heightOfString(text)) / 2);

  // adicionar uma nova página
  doc.addPage();

  // desenhar um triângulo
  doc.save()
      .moveTo(100, 150)
      .lineTo(100, 250)
      .lineTo(200, 250)
      .fill('#FF3300');

  // adicionar um link externo
  var width = doc.widthOfString('This is a link!');
  var height = doc.currentLineHeight();
  doc.fillColor('blue')
      .text('This is a link!', 20, 20, {underline:true})
      .link(20, 20, width, height, 'http://google.com/');

  // enviar o PDF em stream para a resposta
  doc.pipe(res);
  doc.end();

  // adição de um evento de retorno
  var that = this;
  doc.once('end', function () {
      (callback || function () {}).call(that);
  });
};
```

## No navegador, [demo ao vivo][3]:

Basta copiar e colar o código abaixo no editor (lado esquerdo da página) para ver o pdf renderizado em tempo real (lado direito da página).

```javascript
var doc = new PDFDocument();

// posicionar um título no centro da página
var text = 'Node.JS !';
doc.fontSize(25)
  .text(text, (doc.page.width - doc.widthOfString(text)) / 2, (doc.page.height - doc.heightOfString(text)) / 2);

// adicionar uma nova página
doc.addPage();

// desenhar um triângulo
doc.save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

// adicionar um link externo
var width = doc.widthOfString('This is a link!');
var height = doc.currentLineHeight();
doc.fillColor('blue')
  .text('This is a link!', 20, 20, {underline:true})
  .link(20, 20, width, height, 'http://google.com/');

// enviar o PDF em stream para um objeto HTML5 **blob**
var stream = doc.pipe(blobStream());
doc.end();

stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});
```

[1]: http://pdfkit.org/
[2]: http://www.w3.org/TR/WCAG20-TECHS/pdf.html
[3]: http://pdfkit.org/demo/browser.html
