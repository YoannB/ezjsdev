---
title: "Blog per GitHub"
slug: blog-per-github
date: 2014-05-25
description: "Tutorial per creare un blog ospitabile sulle pagine GitHub."
---

Articolo originale [qui][original]

Ecco un blog per le pagine GitHub. Basta fare il [fork][0] del progetto e modificare i file di configurazione per avere il **tuo** blog.

> Primo passo: nel file **index.html** devi sostituire la riga

```html
 <base href="http://yoannb.github.io/gh-blog/">
```

Con l'url delle tue gh-pages:

```html
 <base href="http://[your.github.username].github.io/gh-blog/">
```

Per maggiori informazioni sulle gh-pages, vai [qui][gh-pages] e/o guarda il mio [promemoria][reminder].

## Struttura per personalizzare il **tuo** blog:

Tutti i file che devi modificare sono nella cartella **config**:

```
config
|---json
    |---site.json       -> configurazione del sito (titolo,logo,foto,descrizione...)
    |---skills.json     -> le tue competenze, mostrate in homepage e nel cv
    |---cv.json         -> le tue esperienze e la tua formazione
    |---blog.json       -> l'elenco degli articoli del blog
|---md
    |---blog            -> articoli .md
|---styles
    |---theme.css       -> il css per la personalizzazione grafica
```

## Il file **site.json**

È il file principale, in cui puoi attivare o disattivare ogni parte del sito:

```json
"skills":true,
"cv":true,
"blog":true
```

- Se non vuoi **competenze (skills)** in homepage e nel CV, basta impostare l'attributo a false.
- Se non vuoi vedere il menu per **cv** e / o **blog**, basta impostare l'attributo a false.
- Se non vuoi una **foto (picture)** in homepage, basta eliminare l'attributo **picture**; lo stesso vale per l'attributo **descriptions**.

## Personalizzare la tua foto

Hai tre possibilità per la tua foto:

1. Un'immagine nella cartella **images**:

    ```json
    "photo": {
        "img":"images/me.jpg"
    }
    ```

2. Il tuo **nome utente GitHub**:

    ```json
    "photo": {
        "github":"github"
    }
    ```

3. Oppure il tuo **indirizzo email gravatar**:

    ```json
    "photo": {
        "gravatar":"github@mail.com"
    }
    ```

## Il tuo CV

Devi solo modificare il file **cv.json**.

## Le tue competenze

Allo stesso modo, devi solo modificare il file **skills.json**.

## Scrivere un articolo

Aggiungere un elemento nel file **blog.json** come nell'esempio seguente:

```json
{
    "id" : "the-id",
    "title": "Il titolo",
    "date" : "05/05/2014", // data in formato USA MM/dd/yyyy
    "file" : "config/md/blog/2014/05/my.blog.md", // il percorso del file md
    "visible" : false // usare visible per mostrare un articolo solo quando è pronto
}
```

Creare un nuovo file nella posizione indicata e scrivere il proprio articolo.

## Configurazione di Disqus

Andare sul [sito][4] e registrare un nuovo account se vuoi usare disqus sul tuo blog.

Poi aggiungere il nuovo identificativo dell'account nel file **site.json**:

```json
"disqus" : {
    "shortname":"username"
},
```

## Personalizzare la visualizzazione del Markdown

Puoi cambiare lo stile usato modificando il file css nell'attributo **cssMarkdown**:

```json
"cssMarkdown" : "github.css",
```

> **Nota**: l'elenco dei file css disponibili si trova nella cartella **/bower_components/highlightjs/styles/**.

## Maggiori informazioni sul progetto

- Uso di [Angular.JS][1] versione 1.2.15.
- Uso di [Bootstrap CSS][2] per gli stili.
- Uso di [Markdown][3] per gli articoli.
- Uso di [Disqus][4] per i commenti.
- Personalizzazione tramite file JSON.
- Generato con Node.JS e Grunt/Bower/Yo.

## Sorgenti

I sorgenti del progetto sono [qui][5] e la demo è [qui][6].

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
