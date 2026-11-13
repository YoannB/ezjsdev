---
title: "Blog para o GitHub"
slug: blog-para-o-github
date: 2014-05-25
description: "Tutorial para criar um blog que pode ser hospedado nas páginas do GitHub."
---

Artigo original [aqui][original]

Eis um blog para as páginas do GitHub. Basta fazer um [fork][0] do projeto e modificar os arquivos de configuração para ter o **seu** blog.

> Primeiro passo: no arquivo **index.html**, você deve substituir a linha

```html
 <base href="http://yoannb.github.io/gh-blog/">
```

Pela url das suas gh-pages:

```html
 <base href="http://[your.github.username].github.io/gh-blog/">
```

Para mais informações sobre as gh-pages, vá [lá][gh-pages] e/ou veja o meu [lembrete][reminder].

## Estrutura para personalizar o **seu** blog:

Todos os arquivos que você precisa modificar estão no diretório **config**:

```
config
|---json
    |---site.json       -> configuração do site (título,logo,foto,descrição...)
    |---skills.json     -> as suas competências, exibidas na página inicial e no cv
    |---cv.json         -> as suas experiências e formações
    |---blog.json       -> a lista de artigos do blog
|---md
    |---blog            -> artigos .md
|---styles
    |---theme.css       -> o css para a personalização gráfica
```

## O arquivo **site.json**

É o arquivo principal, onde você pode ativar ou desativar cada parte do site:

```json
"skills":true,
"cv":true,
"blog":true
```

- Se não quiser **competências (skills)** na página inicial e no CV, basta definir o atributo como false.
- Se não quiser ver o menu de **cv** e / ou **blog**, basta definir o atributo como false.
- Se não quiser **foto (picture)** na página inicial, basta remover o atributo **picture**; o mesmo vale para o atributo **descriptions**.

## Personalizar a sua foto

Você tem três opções para a sua foto:

1. Uma imagem no diretório **images**:

    ```json
    "photo": {
        "img":"images/me.jpg"
    }
    ```

2. O seu **nome de usuário do GitHub**:

    ```json
    "photo": {
        "github":"github"
    }
    ```

3. Ou o seu **endereço de e-mail do gravatar**:

    ```json
    "photo": {
        "gravatar":"github@mail.com"
    }
    ```

## O seu CV

Basta editar o arquivo **cv.json**.

## As suas competências

Da mesma forma, basta editar o arquivo **skills.json**.

## Escrever um artigo

Adicionar um elemento ao arquivo **blog.json** como no exemplo seguinte:

```json
{
    "id" : "the-id",
    "title": "O título",
    "date" : "05/05/2014", // data no formato americano MM/dd/yyyy
    "file" : "config/md/blog/2014/05/my.blog.md", // o caminho do arquivo md
    "visible" : false // usar visible para mostrar um artigo só quando estiver pronto
}
```

Criar um novo arquivo no local indicado e redigir o seu artigo.

## Configuração do Disqus

Ir ao [site][4] e registrar uma nova conta se quiser usar o disqus no seu blog.

E adicionar o seu novo identificador de conta no arquivo **site.json**:

```json
"disqus" : {
    "shortname":"username"
},
```

## Personalizar a exibição do Markdown

Você pode mudar o estilo utilizado modificando o arquivo css no atributo **cssMarkdown**:

```json
"cssMarkdown" : "github.css",
```

> **Nota**: a lista de arquivos css disponíveis está na pasta **/bower_components/highlightjs/styles/**.

## Mais informações sobre o projeto

- Uso do [Angular.JS][1] versão 1.2.15.
- Uso do [Bootstrap CSS][2] para os estilos.
- Uso de [Markdown][3] para os artigos.
- Uso do [Disqus][4] para os comentários.
- Personalização por meio de arquivos JSON.
- Gerado com Node.JS e Grunt/Bower/Yo.

## Fontes

As fontes do projeto estão [aqui][5] e a demo está [aqui][6].

[original]: https://github.com/YoannB/gh-blog/blob/master/README.md
[gh-pages]: https://pages.github.com/
[reminder]: /pt/lembretes/lembrete-github
[0]: https://github.com/YoannB/gh-blog/fork
[1]: https://angularjs.org/
[2]: http://getbootstrap.com/css/
[3]: http://fr.wikipedia.org/wiki/Markdown
[4]: http://disqus.com/
[5]: https://github.com/YoannB/gh-blog
[6]: http://yoannb.github.io/gh-blog
