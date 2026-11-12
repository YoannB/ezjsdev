---
title: "Iniziare con Angular.JS"
slug: iniziare-con-angular-js
date: 2014-03-09
description: "Iniziare con Angular.JS attraverso un esempio."
---

## Struttura del progetto

Ecco un esempio statico di progetto angular.js basato sul codice del generatore generator-angular ([promemoria][pb1]).

![Struttura](/articles/debuter-avec-angular-js/angular_static.png)

## Installazione di base di Angular.JS

### Gli import

Per cominciare, bisogna aggiungere i tag script alla fine del body:

- [angular.js][1]

    ```html
    <script src="http://code.angularjs.org/1.2.15/angular.js"></script>
    <script src="http://code.angularjs.org/1.2.15/angular-route.js"></script>
    ```

- Gli script del progetto

    ```html
    <script src="app.js"></script>
    <script src="main.js"></script>
    ```

> **Nota:** mettendo gli script alla fine del body, angular si carica da solo.

### La dichiarazione

Poi nella pagina html bisogna aggiungere le direttive:

- ng-app (nome del modulo angular): dichiarazione dell'applicazione angular

    ```html
    <body ng-app="angularApp">
    ```

    È anche possibile fare la dichiarazione sul 'head' (per personalizzare il titolo del sito, per esempio); in questo caso angular prevede un **xmlns** (per i vecchi browser a cui non piacerebbero tutti i nuovi attributi di angular):

    ```html
    <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="angularApp">
    ```

- ng-view (il contenitore in cui verranno caricate le pagine)

    ```html
    <div class="container" ng-view></div>
    ```

### La configurazione

#### Le route

La pagina HTML è fatta, passiamo alla configurazione dell'applicazione, le **route** (file app.js)

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

> **Nota:** per rendere angular completamente statico, disattivo l'**html5Mode** e aggiungo un **hashPrefix**.

#### I controller

Ora che le **route** sono create, restano da scrivere i controller nel file main.js; viene creato un semplice array di oggetti e messo nello **$scope** della pagina:

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

E nel file menu.js viene aggiunto un metodo che permette di evidenziare il menu selezionato:

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

#### I template

Ci serve una pagina parziale main.html; il codice è il seguente:

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
  <!-- la direttiva ng-repeat recupera direttamente l'oggetto awesomeThings che è stato messo nello $scope-->
  <div ng-repeat="thing in awesomeThings">
    <h4>{{thing.title}}</h4>
    <p>{{thing.description}}</p>
  </div>
</div>

<!-- include angular -->
<div ng-include="'partials/footer.html'"></div>
```

E anche una pagina parziale menu.html e un'altra footer.html:

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

## La pagina index.html completa

Per completare, bisogna aggiungere la parte di stile nel head della pagina; come il generatore, tengo [Bootstrap][2] ma in versione **css only** e aggiungo [font-awesome][3] per le icone:

```html
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
<link rel="stylesheet" href="styles/main.css">
```

Il che dà come pagina index.html:

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

## Codice sorgente

Il codice **completo** del progetto è su [github][4] e la demo è [qui][5].

Per la demo sono andato su [bootsnipp][6] a prendere un esempio di pagine **chi siamo** e **contatti** fatte per Bootstrap.

[pb1]: #!reminders/angular-js
[1]: http://angularjs.org/
[2]: http://getbootstrap.com/css/
[3]: http://fortawesome.github.io/Font-Awesome/
[4]: https://github.com/YoannB/angular-static
[5]: http://yoannb.github.io/angular-static
[6]: http://bootsnipp.com
