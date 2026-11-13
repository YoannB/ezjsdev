---
title: "Angular FullStack"
slug: angular-fullstack
date: 2014-03-10
description: "Merkzettel für den Einstieg in Angular FullStack."
---

- [Node.JS][1] installieren

- [Grunt/Yo/Bower][2] installieren

- Den Generator angular-fullstack installieren

    ```bash
    sudo npm install generator-angular-fullstack
    ```

> **Hinweis:** Für andere Generatoren siehe den Merkzettel zu den angesagten [Generatoren][3]

Struktur des generierten Projekts:

![Struktur](/reminders/angular-js/angular_struc.png)

Nach der Installation des Projekts müssen die Abhängigkeiten heruntergeladen werden, mit dem Befehl

```bash
bower install
```

> **Hinweis:** Bei einer globalen Installation kann eine blockierende Meldung erscheinen; mit 'bower install --allow-root' läuft der Befehl durch

Die von **grunt** definierten Befehle sind:

- die Anwendung im Entwicklungsmodus starten

    ```bash
    grunt serve
    ```

- Build und Start im Produktionsmodus

    ```bash
    grunt serve:dist
    ```

- die Distribution des Projekts erzeugen

    ```bash
    grunt build
    ```

Um die Distribution zu starten, in das Verzeichnis 'dist' wechseln und den Befehl ausführen

```bash
NODE_ENV=production node server.js
```

Tests mit karma:

**Hinweis:** Eine Datei karma.conf.js wird benötigt; wurde sie nicht generiert, muss man eine hinzufügen ([Beispiel][4])

- Die serverseitigen Tests starten

    ```bash
    grunt test:server
    ```

- Die clientseitigen Tests starten

    ```bash
    grunt test:client
    ```

[1]: /de/merkzettel/node-js-installieren
[2]: /de/merkzettel/grunt-yo-bower-yeoman
[3]: /de/merkzettel/yeoman-generatoren
[4]: https://raw.githubusercontent.com/YoannB/fullstack-demo/master/karma.conf.js
