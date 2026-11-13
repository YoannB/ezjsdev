---
title: "Começar com Angular.JS"
slug: comecar-com-angular-js
date: 2014-03-09
description: "Começar com Angular.JS através de um exemplo."
---

## Estrutura do projeto

Eis um exemplo estático de projeto angular.js baseado no código do gerador generator-angular ([lembrete][pb1]).

![Estrutura](/articles/debuter-avec-angular-js/angular_static.png)

## Instalação básica do Angular.JS

### Os imports

Para começar, é preciso adicionar as tags script no fim do body:

- [angular.js][1]

    ```html
    <script src="http://code.angularjs.org/1.2.15/angular.js"></script>
    <script src="http://code.angularjs.org/1.2.15/angular-route.js"></script>
    ```

- Os scripts do projeto

    ```html
    <script src="app.js"></script>
    <script src="main.js"></script>
    ```

> **Nota:** colocando os scripts no fim do body, o angular carrega sozinho.

### A declaração

Em seguida, na página html, é preciso adicionar as diretivas:

- ng-app (nome do módulo angular): declaração da aplicação angular

    ```html
    <body ng-app="angularApp">
    ```

    Também é possível fazer a declaração no 'head' (para personalizar o título do site, por exemplo); nesse caso o angular previu um **xmlns** (para os navegadores antigos que não gostariam de todos os novos atributos do angular):

    ```html
    <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="angularApp">
    ```

- ng-view (o contêiner no qual as páginas serão carregadas)

    ```html
    <div class="container" ng-view></div>
    ```

### A configuração

#### As rotas

A página HTML está pronta; passemos à configuração da aplicação, as **rotas** (arquivo app.js)

```javascript
'use strict';

angular.module('angularApp', [
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
      .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
      })
      .otherwise({
          redirectTo: '/'
      });
  /* static way, full hashbang '#!' */
  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('!');
});
```

> **Nota:** para tornar o angular completamente estático, desativo o **html5Mode** e adiciono um **hashPrefix**.

#### Os controladores

Agora que as **rotas** estão criadas, faltam os controladores a programar no arquivo main.js; um simples array de objetos é criado e colocado no **$scope** da página:

```javascript
'use strict';

angular.module('angularApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      {title:'HTML5 Boilerplate',description:'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.'},
      {title:'AngularJS',description:'AngularJS is a toolset for building the framework most suited to your application development.'},
      {title:'Karma',description:'Spectacular Test Runner for JavaScript.'}
    ];
});
```

E no arquivo menu.js é adicionado um método que permite destacar o menu selecionado:

```javascript
'use strict';

angular.module('angularApp')
  .controller('MenuCtrl', function ($scope, $rootScope, $location) {
        // construction of method isActive
        $scope.isActive = function(route) {
            var path = $location.path();
            var tmp = route;
            tmp = tmp.replace(/#!/gi,"");
            return (tmp === path || (route !== '' && path.indexOf(tmp+"/") > -1));
        };
    }
);
```

#### Os templates

Precisamos de uma página parcial main.html; o código é o seguinte:

```html
<!-- include angular -->
<div ng-include="'partials/menu.html'"></div>

<div class="jumbotron">
  <h1>'Allo, 'Allo!</h1>
  <p class="lead">
    <img src="images/yeoman.png" alt="I'm Yeoman"><br>
    Always a pleasure scaffolding your apps.
  </p>
  <p><a class="btn btn-lg btn-success" ng-href="https://github.com/YoannB/angular-static">Sources!</a></p>
</div>

<div class="row marketing">
  <!-- a diretiva ng-repeat recupera diretamente o objeto awesomeThings que foi colocado no $scope-->
  <div ng-repeat="thing in awesomeThings">
    <h4>{{thing.title}}</h4>
    <p>{{thing.description}}</p>
  </div>
</div>

<!-- include angular -->
<div ng-include="'partials/footer.html'"></div>
```

E também uma página parcial menu.html e outra footer.html:

```html
<div class="header" ng-controller="MenuCtrl">
    <ul class="nav nav-pills pull-right">
        <li ng-class="{active: isActive('/#!')}"><a ng-href="#!">Home</a></li>
        <li ng-class="{active: isActive('/#!about')}"><a ng-href="#!about/">About</a></li>
        <li ng-class="{active: isActive('/#!contact')}"><a ng-href="#!contact/">Contact</a></li>
    </ul>
    <h3 class="text-muted">Angular JS Static + Bootstrap</h3>
</div>
```

```html
<div class="footer">
    <p>@2014 Yoann Barbier</p>
</div>
```

## A página index.html completa

Para completar, é preciso adicionar a parte de estilos no head da página; como o gerador, mantenho o [Bootstrap][2], mas na versão **css only**, e adiciono o [font-awesome][3] para os ícones:

```html
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
<link rel="stylesheet" href="styles/main.css">
```

O que dá como página index.html:

```html
<!doctype html>
<html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="angularApp">
  <head>
    <!-- angular js -->
    <base href="/">
    <!-- meta -->
    <meta charset="utf-8">
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <!-- angular ie guide https://docs.angularjs.org/guide/ie -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <title>Angular static</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="styles/main.css">
  </head>
  <body>
    <!--[if lt IE 9]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <!-- Angular application -->
    <div class="container" ng-view></div>

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID -->
     <script>
       (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
       (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
       m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
       })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

       ga('create', 'UA-XXXXX-X');
       ga('send', 'pageview');
    </script>

    <!-- Polyfill JS -->
    <!--[if lte IE 9]>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/json3/3.3.1/json3.min.js"></script>
    <![endif]-->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/2.3.0/es5-shim.min.js"></script>
    <!-- endbuild -->

    <!-- Respond JS -->
    <!--[if lte IE 8]>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.js"></script>
    <![endif]-->

    <script src="http://code.angularjs.org/1.2.15/angular.js"></script>
    <script src="http://code.angularjs.org/1.2.15/angular-route.js"></script>

    <script src="scripts/app.js"></script>
    <script src="scripts/controllers/main.js"></script>
    <script src="scripts/controllers/menu.js"></script>
</body>
</html>
```

## Código-fonte

O código **completo** do projeto está no [github][4] e a demo está [aqui][5].

Para a demo, fui ao [bootsnipp][6] buscar um exemplo de páginas **sobre** e **contato** feitas para Bootstrap.

[pb1]: /pt/lembretes/angular-fullstack
[1]: http://angularjs.org/
[2]: http://getbootstrap.com/css/
[3]: http://fortawesome.github.io/Font-Awesome/
[4]: https://github.com/YoannB/angular-static
[5]: http://yoannb.github.io/angular-static
[6]: http://bootsnipp.com
