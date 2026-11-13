---
title: "Lembrete de GitHub"
slug: lembrete-github
date: 2014-05-25
description: "Lembrete dos comandos git úteis."
---

## Começar a trabalhar

Depois de criar um novo repositório no GitHub, para trazê-lo para o seu espaço de trabalho, basta executar, no local onde se quer que a pasta seja criada:

```bash
git clone https://github.com/[your.github.username]/[your.new.repository]
```

## Os comandos úteis

- **Config**: configurar a sua identidade git

    ```
    Run

      git config --global user.email "you@example.com"
      git config --global user.name "Your Name"

    to set your account's default identity.
    Omit --global to set the identity only in this repository.
    ```

- **Merge**: trazer para o local as alterações do espaço de trabalho

    ```bash
    git pull
    ```

    ou

    ```bash
    git pull origin master
    ```

- **Switch branch**: passar de uma branch para outra

    ```bash
    git checkout mybranch
    ```

- **Copy branch modifications to master**: fundir a branch no tronco

    ```bash
    git merge gh-pages
    ```

- **Commit**: fazer o commit dos arquivos no repositório GitHub

    ```bash
    git commit --all
    ```

    ou

    ```bash
    git commit -a -m "comentário"
    ```

    Depois enviar o commit:

    ```bash
    git push origin master
    ```

- **Remove**: se um arquivo foi commitado no git mas agora está no .gitignore

    ```bash
    git rm --cached <file_name>
    ```

> **Importante:** para evitar conflitos num merge, começar por fazer um:
>
> ```bash
> git status
> ```
>
> Depois, abrir cada arquivo e resolver os conflitos; em seguida pode fazer o commit.

> **Dica:** cada comando pode receber como parâmetros a URL do projeto e o nome da branch:
>
> ```bash
> git {pull,commit,push} {options} https://github.com/[your.github.username]/[your.new.repository] [branch.name]
> ```

## Criar a branch [**gh-pages**][1]

Para criar a branch gh-pages, clonar o repositório num novo diretório e, dentro dele:

1. Criação da nova branch:

    ```bash
    git checkout --orphan gh-pages
    ```

2. Preparação do commit com o seu comentário:

    ```bash
    git commit -a -m "First gh-pages commit"
    ```

3. Envio da versão gh-pages:

    ```bash
    git push origin gh-pages
    ```

Pronto, o seu site deve estar acessível no endereço `http://[your.github.username].github.io/[your.new.repository]`.

> Mais informações sobre a criação manual das páginas [aqui][3].

## Criar uma tag

Para criar a tag 1.0.0, no repositório **master**:

1. Ver as tags:

    ```bash
    git tag
    ```

2. Criação da tag 1.0.0 com o seu comentário:

    ```bash
    git tag -a 1.0.0 -m "1.0.0"
    ```

3. Envio das tags:

    ```bash
    git push --tags
    ```

> Útil ao criar pacotes bower, instruções [aqui][4].

[1]: https://pages.github.com/
[3]: https://help.github.com/articles/creating-project-pages-manually
[4]: http://bower.io/docs/creating-packages/
