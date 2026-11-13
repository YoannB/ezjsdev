---
title: "Generating PDFs with Node.JS"
slug: generating-pdfs-with-node-js
date: 2014-09-12
description: "Generating PDFs with PdfKit and Node.JS."
---

To generate PDFs, I chose the [PdfKit][1] library for its ease of use (you code the pdf like an HTML5 Canvas object) but above all because it generates pdfs that follow the [w3c][2] standard.

## Installation

Install the module (current version 0.7.0):

```bash
npm install pdfkit
```

or with the **--save** option to automatically save the dependency in the package.json file:

```bash
npm install pdfkit --save
```

> Note: the library can be used in a browser without any server side (requires a recent browser, see the [PdfKit][1] website)

## Getting started

In a **pdf.js** file, we code the content of the pdf:

```javascript
'use strict';

var PDFDocument = require('pdfkit');

exports.sample = function (res,callback) {
  // the PdfKit constructor accepts several parameters:
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

  // place a title in the middle of the page
  var text = 'Node.JS !';
  doc.fontSize(25)
      .text(text, (doc.page.width - doc.widthOfString(text)) / 2, (doc.page.height - doc.heightOfString(text)) / 2);

  // add a new page
  doc.addPage();

  // draw a triangle
  doc.save()
      .moveTo(100, 150)
      .lineTo(100, 250)
      .lineTo(200, 250)
      .fill('#FF3300');

  // add an external link
  var width = doc.widthOfString('This is a link!');
  var height = doc.currentLineHeight();
  doc.fillColor('blue')
      .text('This is a link!', 20, 20, {underline:true})
      .link(20, 20, width, height, 'http://google.com/');

  // stream the PDF into the response
  doc.pipe(res);
  doc.end();

  // add a callback event
  var that = this;
  doc.once('end', function () {
      (callback || function () {}).call(that);
  });
};
```

## In the browser, [live demo][3]:

Just copy and paste the code below into the editor (left side of the page) to see the pdf rendered in real time (right side of the page).

```javascript
var doc = new PDFDocument();

// place a title in the middle of the page
var text = 'Node.JS !';
doc.fontSize(25)
  .text(text, (doc.page.width - doc.widthOfString(text)) / 2, (doc.page.height - doc.heightOfString(text)) / 2);

// add a new page
doc.addPage();

// draw a triangle
doc.save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

// add an external link
var width = doc.widthOfString('This is a link!');
var height = doc.currentLineHeight();
doc.fillColor('blue')
  .text('This is a link!', 20, 20, {underline:true})
  .link(20, 20, width, height, 'http://google.com/');

// stream the PDF into an HTML5 **blob** object
var stream = doc.pipe(blobStream());
doc.end();

stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});
```

[1]: http://pdfkit.org/
[2]: http://www.w3.org/TR/WCAG20-TECHS/pdf.html
[3]: http://pdfkit.org/demo/browser.html
