---
title: "Pense-bête GitHub"
slug: pense-bete-github
date: 2014-05-25
description: "Pense-bête des commandes git utiles."
---

## Commencer à travailler

Après avoir créé un nouveau repository sur GitHub, pour le récupérer dans son espace de travail, il suffit de faire, à l'emplacement où l'on souhaite que le dossier soit créé :

```bash
git clone https://github.com/[your.github.username]/[your.new.repository]
```

## Les commandes utiles

- **Config** : configurer son identité git

    ```
    Run

      git config --global user.email "you@example.com"
      git config --global user.name "Your Name"

    to set your account's default identity.
    Omit --global to set the identity only in this repository.
    ```

- **Merge** : récupération des modifications de l'espace de travail en local

    ```bash
    git pull
    ```

    ou

    ```bash
    git pull origin master
    ```

- **Switch branch** : passage d'une branche à une autre

    ```bash
    git checkout mybranch
    ```

- **Copy branch modifications to master** : fusion de la branche sur le tronc

    ```bash
    git merge gh-pages
    ```

- **Commit** : réaliser le commit des fichiers sur le repository GitHub

    ```bash
    git commit --all
    ```

    ou

    ```bash
    git commit -a -m "commentaire"
    ```

    Puis réaliser le commit :

    ```bash
    git push origin master
    ```

- **Remove** : si un fichier a été commité sur git mais que maintenant il est dans le .gitignore

    ```bash
    git rm --cached <file_name>
    ```

> **Important :** pour éviter les conflits lors d'un merge, commencer par faire un :
>
> ```bash
> git status
> ```
>
> Ensuite, ouvrir chaque fichier et résoudre les conflits, ensuite vous pouvez commiter.

> **Astuce :** chaque commande peut être paramétrée avec l'URL du projet et le nom de la branche :
>
> ```bash
> git {pull,commit,push} {options} https://github.com/[your.github.username]/[your.new.repository] [branch.name]
> ```

## Créer la branche [**gh-pages**][1]

Pour créer la branche des gh-pages, cloner le repository dans un nouveau répertoire et dedans :

1. Création de la nouvelle branche :

    ```bash
    git checkout --orphan gh-pages
    ```

2. Préparation du commit avec son commentaire :

    ```bash
    git commit -a -m "First gh-pages commit"
    ```

3. Commit de la version gh-pages :

    ```bash
    git push origin gh-pages
    ```

Voilà, votre site devrait être accessible à l'adresse `http://[your.github.username].github.io/[your.new.repository]`.

> Plus d'informations à propos de la création des pages manuellement [ici][3].

## Créer un tag

Pour créer le tag 1.0.0, dans le repository **master** :

1. Visualisation des tags :

    ```bash
    git tag
    ```

2. Création du tag 1.0.0 avec son commentaire :

    ```bash
    git tag -a 1.0.0 -m "1.0.0"
    ```

3. Commit des tags :

    ```bash
    git push --tags
    ```

> Utile lors de la création de packages bower, mode d'emploi [ici][4].

[1]: https://pages.github.com/
[3]: https://help.github.com/articles/creating-project-pages-manually
[4]: http://bower.io/docs/creating-packages/
