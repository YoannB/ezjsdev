---
title: "Blog pour GitHub"
slug: blog-pour-github
date: 2014-05-25
description: "Tutorial pour créer un blog hébergeable sur les pages GitHub."
---

Article original [ici][original]

Voici un blog pour les pages GitHub. Il vous suffit de [fork][0] le projet et modifier les fichiers de configuration pour avoir **votre** blog.

> Première action : vous devez modifier dans le fichier **index.html** la ligne

```html
 <base href="http://yoannb.github.io/gh-blog/">
```

Par l'url de votre gh-pages :

```html
 <base href="http://[your.github.username].github.io/gh-blog/">
```

Pour plus d'informations sur les gh-pages, allez [là][gh-pages] et/ou regardez mon [pense-bête][reminder].

## Structure pour personnaliser **votre** blog :

Tous les fichiers que vous avez à modifier sont dans le répertoire **config** :

```
config
|---json
    |---site.json       -> configuration du site (titre,logo,photo,description...)
    |---skills.json     -> vos compétences qui sont affichées sur l'accueil et le cv
    |---cv.json         -> vos expériences et formations
    |---blog.json       -> la liste des articles du blog
|---md
    |---blog            -> articles .md
|---styles
    |---theme.css       -> le css pour la customisation graphique
```

## Le fichier **site.json**

C'est le fichier principal où vous pouvez activer ou désactiver chaque partie du site :

```
"skills":true,
"cv":true,
"blog":true
```

- Si vous ne voulez pas de **compétences(skills)** sur la page d'accueil et le CV, il vous suffit de passer l'attribut à false.
- Si vous ne voulez pas voir le menu pour **cv** et / ou **blog**, il vous suffit de passer l'attribut à false.
- Si vous ne voulez pas de **photo(picture)** sur la page d'accueil, il vous suffit de supprimer l'attribut **picture**, pareil pour l'attribut **descriptions**.

## Personnaliser votre photo

Vous avez trois choix pour votre photo :

1. Une image dans le répertoire **images** :

    ```
    "photo": {
        "img":"images/me.jpg"
    }
    ```

2. Votre **pseudo GitHub** :

    ```
    "photo": {
        "github":"github"
    }
    ```

3. Ou votre **adresse mail gravatar** :

    ```
    "photo": {
        "gravatar":"github@mail.com"
    }
    ```

## Votre CV

Vous avez juste à éditer le fichier **cv.json**.

## Vos Compétences

De même, vous avez juste à éditer le fichier **skills.json**.

## Écrire un article

Ajouter un élément dans le fichier **blog.json** comme l'exemple suivant :

```
{
    "id" : "the-id",
    "title": "Le titre",
    "date" : "05/05/2014", // date au format US MM/dd/yyyy
    "file" : "config/md/blog/2014/05/my.blog.md", // le chemin du fichier md
    "visible" : false // utiliser visible pour montrer un article seulement lorsqu'il est prêt
}
```

Créer un nouveau fichier à l'endroit que vous avez indiqué et rédiger votre article.

## Configuration de Disqus

Aller sur le [site][4] et enregistrer un nouveau compte si vous voulez utiliser disqus sur votre blog.

Et ajouter votre nouvel identifiant de compte dans le fichier **site.json** :

```
"disqus" : {
    "shortname":"username"
},
```

## Customiser l'affichage Markdown

Vous pouvez changer le style utilisé en modifiant le fichier css sur l'attribut **cssMarkdown** :

```
"cssMarkdown" : "github.css",
```

> **Note** : La liste des fichiers css disponibles est dans le dossier **/bower_components/highlightjs/styles/**.

## Plus d'informations sur le projet

- Utilisation d'[Angular.JS][1] version 1.2.15.
- Utilisation de [Bootstrap CSS][2] pour les styles.
- Utilisation de [Markdown][3] pour les articles.
- Utilisation de [Disqus][4] pour les commentaires.
- Customisation à l'aide de fichiers JSON.
- Généré avec Node.JS et Grunt/Bower/Yo.

## Sources

Les sources du projet sont [ici][5] et la démo est [ici][6].

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
