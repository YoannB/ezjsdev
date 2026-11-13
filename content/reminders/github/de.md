---
title: "GitHub-Merkzettel"
slug: github-merkzettel
date: 2014-05-25
description: "Merkzettel mit nützlichen git-Befehlen."
---

## Mit der Arbeit beginnen

Nachdem man ein neues Repository auf GitHub angelegt hat, holt man es in seinen Arbeitsbereich, indem man an der Stelle, an der der Ordner entstehen soll, Folgendes ausführt:

```bash
git clone https://github.com/[your.github.username]/[your.new.repository]
```

## Nützliche Befehle

- **Config**: die eigene git-Identität einrichten

    ```
    Run

      git config --global user.email "you@example.com"
      git config --global user.name "Your Name"

    to set your account's default identity.
    Omit --global to set the identity only in this repository.
    ```

- **Merge**: die Änderungen des Arbeitsbereichs lokal holen

    ```bash
    git pull
    ```

    oder

    ```bash
    git pull origin master
    ```

- **Switch branch**: von einem Branch zu einem anderen wechseln

    ```bash
    git checkout mybranch
    ```

- **Copy branch modifications to master**: den Branch in den Hauptzweig mergen

    ```bash
    git merge gh-pages
    ```

- **Commit**: die Dateien in das GitHub-Repository committen

    ```bash
    git commit --all
    ```

    oder

    ```bash
    git commit -a -m "kommentar"
    ```

    Dann den Commit pushen:

    ```bash
    git push origin master
    ```

- **Remove**: wenn eine Datei in git committet wurde, inzwischen aber in der .gitignore steht

    ```bash
    git rm --cached <file_name>
    ```

> **Wichtig:** Um Konflikte bei einem Merge zu vermeiden, zuerst Folgendes ausführen:
>
> ```bash
> git status
> ```
>
> Danach jede Datei öffnen und die Konflikte lösen; anschließend kann committet werden.

> **Tipp:** Jeder Befehl kann mit der URL des Projekts und dem Namen des Branches parametriert werden:
>
> ```bash
> git {pull,commit,push} {options} https://github.com/[your.github.username]/[your.new.repository] [branch.name]
> ```

## Den Branch [**gh-pages**][1] anlegen

Um den gh-pages-Branch anzulegen, das Repository in ein neues Verzeichnis klonen und darin:

1. Den neuen Branch anlegen:

    ```bash
    git checkout --orphan gh-pages
    ```

2. Den Commit mit seinem Kommentar vorbereiten:

    ```bash
    git commit -a -m "First gh-pages commit"
    ```

3. Die gh-pages-Version pushen:

    ```bash
    git push origin gh-pages
    ```

Fertig, die Website sollte unter folgender Adresse erreichbar sein: `http://[your.github.username].github.io/[your.new.repository]`.

> Mehr Informationen zum manuellen Anlegen der Seiten [hier][3].

## Ein Tag anlegen

Um das Tag 1.0.0 anzulegen, im **master**-Repository:

1. Die Tags anzeigen:

    ```bash
    git tag
    ```

2. Das Tag 1.0.0 mit seinem Kommentar anlegen:

    ```bash
    git tag -a 1.0.0 -m "1.0.0"
    ```

3. Die Tags pushen:

    ```bash
    git push --tags
    ```

> Nützlich beim Erstellen von bower-Paketen, Anleitung [hier][4].

[1]: https://pages.github.com/
[3]: https://help.github.com/articles/creating-project-pages-manually
[4]: http://bower.io/docs/creating-packages/
