---
title: "Blog für GitHub"
slug: blog-fuer-github
date: 2014-05-25
description: "Tutorial, um einen Blog zu erstellen, der auf GitHub Pages gehostet werden kann."
---

Originalartikel [hier][original]

Hier ein Blog für GitHub Pages. Einfach das Projekt [forken][0] und die Konfigurationsdateien anpassen, um **deinen** Blog zu haben.

> Erster Schritt: In der Datei **index.html** musst du die Zeile

```html
 <base href="http://yoannb.github.io/gh-blog/">
```

durch die URL deiner gh-pages ersetzen:

```html
 <base href="http://[your.github.username].github.io/gh-blog/">
```

Weitere Informationen zu gh-pages gibt es [dort][gh-pages] und/oder in meiner [Gedächtnisstütze][reminder].

## Struktur, um **deinen** Blog anzupassen:

Alle Dateien, die du ändern musst, liegen im Verzeichnis **config**:

```
config
|---json
    |---site.json       -> Konfiguration der Website (Titel,Logo,Foto,Beschreibung...)
    |---skills.json     -> deine Kompetenzen, angezeigt auf der Startseite und im Lebenslauf
    |---cv.json         -> deine Berufserfahrung und Ausbildung
    |---blog.json       -> die Liste der Blogartikel
|---md
    |---blog            -> .md-Artikel
|---styles
    |---theme.css       -> das CSS für die grafische Anpassung
```

## Die Datei **site.json**

Das ist die Hauptdatei, in der du jeden Teil der Website aktivieren oder deaktivieren kannst:

```json
"skills":true,
"cv":true,
"blog":true
```

- Wenn du keine **Kompetenzen (skills)** auf der Startseite und im Lebenslauf möchtest, setze das Attribut einfach auf false.
- Wenn du das Menü für **cv** und / oder **blog** nicht sehen möchtest, setze das Attribut einfach auf false.
- Wenn du kein **Foto (picture)** auf der Startseite möchtest, entferne einfach das Attribut **picture**; dasselbe gilt für das Attribut **descriptions**.

## Dein Foto anpassen

Für dein Foto hast du drei Möglichkeiten:

1. Ein Bild im Verzeichnis **images**:

    ```json
    "photo": {
        "img":"images/me.jpg"
    }
    ```

2. Deinen **GitHub-Benutzernamen**:

    ```json
    "photo": {
        "github":"github"
    }
    ```

3. Oder deine **Gravatar-E-Mail-Adresse**:

    ```json
    "photo": {
        "gravatar":"github@mail.com"
    }
    ```

## Dein Lebenslauf

Du musst nur die Datei **cv.json** bearbeiten.

## Deine Kompetenzen

Ebenso musst du nur die Datei **skills.json** bearbeiten.

## Einen Artikel schreiben

Ein Element in die Datei **blog.json** einfügen, wie im folgenden Beispiel:

```json
{
    "id" : "the-id",
    "title": "Der Titel",
    "date" : "05/05/2014", // Datum im US-Format MM/dd/yyyy
    "file" : "config/md/blog/2014/05/my.blog.md", // der Pfad der md-Datei
    "visible" : false // visible verwenden, um einen Artikel erst anzuzeigen, wenn er fertig ist
}
```

Eine neue Datei an dem angegebenen Ort anlegen und den Artikel schreiben.

## Konfiguration von Disqus

Auf die [Website][4] gehen und ein neues Konto anlegen, wenn du Disqus in deinem Blog verwenden möchtest.

Dann die neue Konto-ID in die Datei **site.json** eintragen:

```json
"disqus" : {
    "shortname":"username"
},
```

## Die Markdown-Darstellung anpassen

Du kannst den verwendeten Stil ändern, indem du die CSS-Datei im Attribut **cssMarkdown** änderst:

```json
"cssMarkdown" : "github.css",
```

> **Hinweis**: Die Liste der verfügbaren CSS-Dateien befindet sich im Ordner **/bower_components/highlightjs/styles/**.

## Mehr Informationen zum Projekt

- Verwendet [Angular.JS][1] in Version 1.2.15.
- Verwendet [Bootstrap CSS][2] für die Styles.
- Verwendet [Markdown][3] für die Artikel.
- Verwendet [Disqus][4] für die Kommentare.
- Anpassung über JSON-Dateien.
- Generiert mit Node.JS und Grunt/Bower/Yo.

## Quellen

Die Quellen des Projekts sind [hier][5], die Demo ist [hier][6].

[original]: https://github.com/YoannB/gh-blog/blob/master/README.md
[gh-pages]: https://pages.github.com/
[reminder]: #!reminders/github
[0]: https://github.com/YoannB/gh-blog/fork
[1]: https://angularjs.org/
[2]: http://getbootstrap.com/css/
[3]: http://fr.wikipedia.org/wiki/Markdown
[4]: http://disqus.com/
[5]: https://github.com/YoannB/gh-blog
[6]: http://yoannb.github.io/gh-blog
