---
title: "Homogeneizar os navegadores"
slug: homogeneizar-os-navegadores
date: 2014-09-05
description: "Lembrete para homogeneizar os navegadores."
---

Para começar bem o desenvolvimento de um site, é preciso partir dos navegadores-alvo, e o mais simples é tornar a exibição homogênea em cada navegador.

## Os polyfills JavaScript

Os polyfills são um conjunto de funções que permitem simular, num navegador antigo, funcionalidades que não estão disponíveis nativamente.

Entre os mais úteis:

- [json3][1]: para decodificar e fazer o parse de JSON.
- [es5][2]: implementação das funções do EcmaScript 5.
- [Respond][3]: simulação das media queries com window.onresize.

No caso de um projeto Node.JS, eis a configuração com o [Bower][bower] (no bower.json):

```json
"json3": "~3.2.6",
"es5-shim": "~2.1.0",
"respond": "~1.4.2"
```

> Nota: também é preciso adicionar à mão a dependência **es5-sham** abaixo da linha de **es5-shim**:
>
> ```html
> <script src="/bower_components/es5-shim/es5-shim.js"></script>
> <script src="/bower_components/es5-shim/es5-sham.js"></script>
> ```

## Reset CSS

O reset CSS é necessário para reiniciar em 0 o valor de certos elementos HTML, para obter uma exibição mais parecida nos diferentes navegadores.

Dependendo do projeto, há várias formas de incluir o reset CSS:

- com um framework CSS (inclusão automática): [Bootstrap][4], [Pure][5], [Knacss][6], ...
- com um arquivo .css de reset (a adicionar): [Normalize.css][7], [Reset CSS de Eric Meyer][8], [YUI CSS reset][9], ...
- com Node.JS e Stylus: [Nib][10], escolhendo entre os resets disponíveis:
    - `global-reset()`
    - `nested-reset()`
    - `reset-font()`
    - `reset-box-model()`
    - `reset-body()`
    - `reset-table()`
    - `reset-table-cell()`
    - `reset-html5()`

## HTML

Adicionar no final do **head** da página as seguintes linhas:

```html
<!-- html 5 new elements -->
<!--[if lt IE 9]><script>"abbr,article,footer,header,nav,section,time".replace(/\w+/g,function(t){document.createElement(t);});</script><![endif]-->
```

> Estas linhas permitem adicionar as novas tags ao documento HTML.

[bower]: /pt/lembretes/grunt-yo-bower-yeoman
[1]: http://bestiejs.github.io/json3/
[2]: https://github.com/es-shims/es5-shim
[3]: https://github.com/scottjehl/Respond
[4]: http://getbootstrap.com/css/
[5]: http://purecss.io/
[6]: http://www.knacss.com/
[7]: https://github.com/necolas/normalize.css
[8]: http://meyerweb.com/eric/tools/css/reset/
[9]: http://yuilibrary.com/yui/docs/cssreset/
[10]: http://visionmedia.github.io/nib/
