---
title: "As vantagens do Stylus / Nib"
slug: as-vantagens-do-stylus-nib
date: 2014-03-23
description: "Alguns trunfos do Stylus / Nib."
---

## Instalação e configuração

Ver o artigo [aqui][1] para utilizar o Stylus com o Angular-fullstack.

## Iconic

As imagens para ícones estão ultrapassadas na Web já há algum tempo; o substituto: as **fontes**.

Personalizáveis como o texto, é possível mudar a sua **cor** e o seu **tamanho** dinamicamente e, conforme o navegador, o zoom nelas é otimizado para não se ver aliasing.

Além disso, a compatibilidade com os navegadores é excelente, mesmo nas versões mais antigas do Internet Explorer.

As fontes Iconic do nib são parecidas com os **glyphicons** do [Bootstrap][2] ou do [font-awesome][3].

## Os prefixos **vendor**

São geradas automaticamente quando a tarefa stylus gera o CSS.

**Exemplo:** animar os glyphicons do Bootstrap adicionando a classe **spin**

`.styl`

```stylus
.spin
  animation spin 2s infinite linear

@keyframes spin
  from
    transform rotate(0deg)
  to
    transform rotate(360deg)
```

Torna-se, depois de gerado pelo Stylus/Nib

`.css`

```css
.spin{-webkit-animation:spin 2s infinite linear;-moz-animation:spin 2s infinite linear;-o-animation:spin 2s infinite linear;-ms-animation:spin 2s infinite linear;animation:spin 2s infinite linear}

@-moz-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-o-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@-ms-keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}
```

Bastante poderoso: já não é preciso pensar nos prefixos de cada propriedade CSS...

[1]: /pt/artigos/substituir-compass-por-stylus-nib
[2]: http://getbootstrap.com/components/
[3]: http://fortawesome.github.io/Font-Awesome/icons/
