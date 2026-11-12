---
title: "Clever-cloud & Node.JS-Anwendung"
slug: clever-cloud-und-node-js-anwendung
date: 2014-10-05
description: "Tutorial, um die erste Node.JS-Anwendung auf Clever-cloud zu deployen."
---

## Registrierung

Auf der Website von [clever-cloud][1] registrieren.

> Für GitHub-Nutzer genügt die Anmeldung mit dem GitHub-Konto; dabei wird zusätzlich der SSH-Schlüssel automatisch übernommen.

> Nach einer manuellen Registrierung muss man auf der Seite der [Konsole][2] im Bereich Profil/SSH-Schlüssel (im Menü unten links, dann oben auf der neuen Seite) seinen öffentlichen SSH-Schlüssel auf der Website hinterlegen:

```
# Schlüssel in die Zwischenablage kopieren
xclip -sel clip < ~/.ssh/id_rsa.pub
```

## Bezahlung

Zunächst die Basislösung wählen und Node.Js als Sprache auswählen.

> standardmäßig liegen die geschätzten Kosten der Website bei 14,40 €/Monat mit 1 CPU und 1 GB RAM.

## Die Anwendung deployen

Mit Node.Js läuft alles automatisch, vorausgesetzt, das Projekt ist folgendermaßen eingerichtet:

- Port 8080 verwenden
- in der Datei package.json angeben:
    1. den "name"
    2. die "version"
    3. das Tag "scripts" mit dem Befehl "start", der den Server startet
    4. alle Abhängigkeiten, die das Projekt benötigt

Beispiel für eine gültige package.json mit einem Express-4.9.5-Server:

```json
{
  "name": "mon-projet",
  "version": "0.0.1",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "body-parser": "^1.9.0",
    "compression": "^1.1.0",
    "cookie-parser": "^1.3.3",
    "cookie-session": "^1.0.2",
    "ejs": "^0.8.5",
    "ejs-locals": "^1",
    "errorhandler": "^1.2.0",
    "express": "^4.9.5",
    "method-override": "^2.2.0",
    "morgan": "^1.3.2",
    "serve-favicon": "^2.1.5",
    "serve-static": "^1.6.3"
  },
  "engines": {
    "node": ">=0.10.32",
    "npm": "1.2.x"
  }
}
```

> Um die Umgebung im **Produktions**modus zu starten:

```
"scripts": {
   "start": "NODE_ENV=production node server.js"
 }
```

## Die Anwendung auf Clever-cloud bringen

Nichts einfacher als das: Clever-cloud verwendet **git**. Bei der Wahl der Sprache erhält man, noch vor der Konfiguration des SSH-Schlüssels, einen **git remote**-Link:

```
git remote add clever git+ssh://git@push.par.clever-cloud.com/app_[id_deiner_app].git
```

Im Verzeichnis der Anwendung den vorherigen Befehl ausführen (git remote ...).

Ist das Projekt noch kein **git**-Projekt, `git init` ausführen.

Wenn dann die Datei **.gitignore** des Projekts aktuell ist und alles gut vorbereitet ist, die Befehle ausführen:

```
git add .
git commit -m "initial commit"
git push clever master
```

> Die Anwendung wird automatisch deployt; um das Server-Log zu sehen, in der clever-cloud-Konsole der Anwendung auf den Link **Logs** gehen. Wenn alles gut läuft, erscheinen die Zeilen:

```
2014-10-09T16:51:57.062Z (GMT) Successfuly deployed in 1 minute and 5 seconds
2014-10-09T16:51:57.062Z (GMT) Server up
```

> Bei Problemen mit dem SSH-Schlüssel lädt der folgende Befehl den Schlüssel in die Sitzung des Terminals:

```
ssh-add ~/.ssh/id_rsa
```

[1]: https://www.clever-cloud.com/fr/
[2]: https://console.clever-cloud.com
