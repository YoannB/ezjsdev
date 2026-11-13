---
title: "GitHub cheat sheet"
slug: github-cheat-sheet
date: 2014-05-25
description: "Cheat sheet of useful git commands."
---

## Getting started

After creating a new repository on GitHub, to get it into your workspace, just run this from the location where you want the folder to be created:

```bash
git clone https://github.com/[your.github.username]/[your.new.repository]
```

## Useful commands

- **Config**: set up your git identity

    ```
    Run

      git config --global user.email "you@example.com"
      git config --global user.name "Your Name"

    to set your account's default identity.
    Omit --global to set the identity only in this repository.
    ```

- **Merge**: fetch the workspace changes locally

    ```bash
    git pull
    ```

    or

    ```bash
    git pull origin master
    ```

- **Switch branch**: move from one branch to another

    ```bash
    git checkout mybranch
    ```

- **Copy branch modifications to master**: merge the branch into the trunk

    ```bash
    git merge gh-pages
    ```

- **Commit**: commit the files to the GitHub repository

    ```bash
    git commit --all
    ```

    or

    ```bash
    git commit -a -m "message"
    ```

    Then push the commit:

    ```bash
    git push origin master
    ```

- **Remove**: if a file was committed to git but is now in the .gitignore

    ```bash
    git rm --cached <file_name>
    ```

> **Important:** to avoid conflicts during a merge, start with:
>
> ```bash
> git status
> ```
>
> Then open each file and resolve the conflicts; after that you can commit.

> **Tip:** every command can take the project URL and the branch name as parameters:
>
> ```bash
> git {pull,commit,push} {options} https://github.com/[your.github.username]/[your.new.repository] [branch.name]
> ```

## Create the [**gh-pages**][1] branch

To create the gh-pages branch, clone the repository into a new directory and, inside it:

1. Create the new branch:

    ```bash
    git checkout --orphan gh-pages
    ```

2. Prepare the commit with its message:

    ```bash
    git commit -a -m "First gh-pages commit"
    ```

3. Push the gh-pages version:

    ```bash
    git push origin gh-pages
    ```

There you go, your site should be available at `http://[your.github.username].github.io/[your.new.repository]`.

> More information about creating the pages manually [here][3].

## Create a tag

To create the 1.0.0 tag, in the **master** repository:

1. List the tags:

    ```bash
    git tag
    ```

2. Create the 1.0.0 tag with its message:

    ```bash
    git tag -a 1.0.0 -m "1.0.0"
    ```

3. Push the tags:

    ```bash
    git push --tags
    ```

> Useful when creating bower packages, how-to [here][4].

[1]: https://pages.github.com/
[3]: https://help.github.com/articles/creating-project-pages-manually
[4]: http://bower.io/docs/creating-packages/
