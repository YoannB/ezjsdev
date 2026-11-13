---
title: "Promemoria GitHub"
slug: promemoria-github
date: 2014-05-25
description: "Promemoria dei comandi git utili."
---

## Iniziare a lavorare

Dopo aver creato un nuovo repository su GitHub, per portarlo nel proprio spazio di lavoro basta eseguire, nella posizione in cui si vuole creare la cartella:

```bash
git clone https://github.com/[your.github.username]/[your.new.repository]
```

## I comandi utili

- **Config**: configurare la propria identità git

    ```
    Run

      git config --global user.email "you@example.com"
      git config --global user.name "Your Name"

    to set your account's default identity.
    Omit --global to set the identity only in this repository.
    ```

- **Merge**: recuperare in locale le modifiche dello spazio di lavoro

    ```bash
    git pull
    ```

    oppure

    ```bash
    git pull origin master
    ```

- **Switch branch**: passare da un branch a un altro

    ```bash
    git checkout mybranch
    ```

- **Copy branch modifications to master**: unire il branch al tronco

    ```bash
    git merge gh-pages
    ```

- **Commit**: fare il commit dei file sul repository GitHub

    ```bash
    git commit --all
    ```

    oppure

    ```bash
    git commit -a -m "commento"
    ```

    Poi inviare il commit:

    ```bash
    git push origin master
    ```

- **Remove**: se un file è stato committato su git ma ora è nel .gitignore

    ```bash
    git rm --cached <file_name>
    ```

> **Importante:** per evitare conflitti durante un merge, cominciare con un:
>
> ```bash
> git status
> ```
>
> Poi aprire ogni file e risolvere i conflitti; a quel punto si può fare il commit.

> **Suggerimento:** ogni comando può ricevere come parametri l'URL del progetto e il nome del branch:
>
> ```bash
> git {pull,commit,push} {options} https://github.com/[your.github.username]/[your.new.repository] [branch.name]
> ```

## Creare il branch [**gh-pages**][1]

Per creare il branch gh-pages, clonare il repository in una nuova cartella e, al suo interno:

1. Creazione del nuovo branch:

    ```bash
    git checkout --orphan gh-pages
    ```

2. Preparazione del commit con il suo commento:

    ```bash
    git commit -a -m "First gh-pages commit"
    ```

3. Invio della versione gh-pages:

    ```bash
    git push origin gh-pages
    ```

Ecco fatto, il sito dovrebbe essere accessibile all'indirizzo `http://[your.github.username].github.io/[your.new.repository]`.

> Maggiori informazioni sulla creazione manuale delle pagine [qui][3].

## Creare un tag

Per creare il tag 1.0.0, nel repository **master**:

1. Visualizzare i tag:

    ```bash
    git tag
    ```

2. Creazione del tag 1.0.0 con il suo commento:

    ```bash
    git tag -a 1.0.0 -m "1.0.0"
    ```

3. Invio dei tag:

    ```bash
    git push --tags
    ```

> Utile quando si creano pacchetti bower, istruzioni [qui][4].

[1]: https://pages.github.com/
[3]: https://help.github.com/articles/creating-project-pages-manually
[4]: http://bower.io/docs/creating-packages/
