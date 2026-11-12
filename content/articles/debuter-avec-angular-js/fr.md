---
title: "Débuter avec Angular.JS"
slug: debuter-avec-angular-js
date: 2014-03-09
description: "Débuter avec Angular.JS par l'exemple."
---

## Structure du projet

Voici un exemple statique de projet angular.js basé sur le code du générateur generator-angular ([pense-bête][pb1]).

![Structure](/articles/debuter-avec-angular-js/angular_static.png)

## Installation de base d'Angular.JS

### Les imports

Pour commencer, il faut ajouter les balises scripts à la fin du body :

- [angular.js][1]

    ```html
    <script src="http://code.angularjs.org/1.2.15/angular.js"></script>
    <script src="http://code.angularjs.org/1.2.15/angular-route.js"></script>
    ```

- Les scripts du projet

    ```html
    <script src="app.js"></script>
    <script src="main.js"></script>
    ```

> **Note :** en plaçant les scripts en fin de body, angular se charge tout seul.

### La déclaration

Ensuite dans la page html il faut rajouter les directives :

- ng-app (nom du module angular) : déclaration de l'application angular

    ```html
    <body ng-app="angularApp">
    ```

    Il est également possible de faire la déclaration sur le 'head' (pour customiser le titre du site par exemple), dans ce cas angular a prévu un **xmlns** (pour les vieux navigateurs qui n'aimeraient pas tous les nouveaux attributs angular) :

    ```html
    <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="angularApp">
    ```

- ng-view (le conteneur dans lequel les pages seront chargées)

    ```html
    <div class="container" ng-view></div>
    ```

### La configuration

#### Les routes

La page HTML est faite, passons à la configuration de l'application, les **routes** (fichier app.js)

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

> **Note :** pour rendre angular complètement statique, je désactive le **html5Mode** et ajoute un **hashPrefix**.

#### Les contrôleurs

Maintenant que les **routes** sont créées, il reste les contrôleurs à coder dans le fichier main.js, un simple tableau d'objets est créé et mis dans le **$scope** de la page :

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

Et dans le fichier menu.js, une méthode permettant de mettre en surbrillance le menu sélectionné est ajoutée :

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

#### Les templates

On a besoin d'une page partielle main.html, le code est le suivant :

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
  <!-- on récupère directement dans la directive ng-repeat l'objet awesomeThings qui a été mis dans le $scope-->
  <div ng-repeat="thing in awesomeThings">
    <h4>{{thing.title}}</h4>
    <p>{{thing.description}}</p>
  </div>
</div>

<!-- include angular -->
<div ng-include="'partials/footer.html'"></div>
```

Et aussi une page partielle menu.html et une autre footer.html :

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

## La page index.html complète

Pour compléter, il faut rajouter la partie style dans le head de la page, comme le générateur, je garde [Bootstrap][2] mais en version **css only** et j'ajoute [font-awesome][3] pour les icônes :

```html
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
<link rel="stylesheet" href="styles/main.css">
```

Ce qui donne comme page index.html :

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

## Code source

Le code **complet** du projet est sur [github][4] et la démo est [ici][5].

Pour la démo, je suis allé sur [bootsnipp][6] pour récupérer un exemple de page **à propos** et **contact** faites pour Bootstrap.

[pb1]: #!reminders/angular-js
[1]: http://angularjs.org/
[2]: http://getbootstrap.com/css/
[3]: http://fortawesome.github.io/Font-Awesome/
[4]: https://github.com/YoannB/angular-static
[5]: http://yoannb.github.io/angular-static
[6]: http://bootsnipp.com
