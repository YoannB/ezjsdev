---
title: "Einstieg in Angular.JS"
slug: einstieg-in-angular-js
date: 2014-03-09
description: "Einstieg in Angular.JS anhand eines Beispiels."
---

## Projektstruktur

Hier ein statisches Beispiel für ein angular.js-Projekt auf Basis des Codes des Generators generator-angular ([Gedächtnisstütze][pb1]).

![Struktur](/articles/debuter-avec-angular-js/angular_static.png)

## Grundinstallation von Angular.JS

### Die Imports

Zunächst müssen die Script-Tags am Ende des body eingefügt werden:

- [angular.js][1]

    ```html
    <script src="http://code.angularjs.org/1.2.15/angular.js"></script>
    <script src="http://code.angularjs.org/1.2.15/angular-route.js"></script>
    ```

- Die Skripte des Projekts

    ```html
    <script src="app.js"></script>
    <script src="main.js"></script>
    ```

> **Hinweis:** Stehen die Skripte am Ende des body, lädt sich angular von selbst.

### Die Deklaration

Anschließend müssen in der HTML-Seite die Direktiven ergänzt werden:

- ng-app (Name des angular-Moduls): Deklaration der angular-Anwendung

    ```html
    <body ng-app="angularApp">
    ```

    Die Deklaration kann auch auf dem 'head' erfolgen (zum Beispiel um den Titel der Website anzupassen); für diesen Fall sieht angular ein **xmlns** vor (für alte Browser, die mit den neuen angular-Attributen nicht zurechtkommen):

    ```html
    <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="angularApp">
    ```

- ng-view (der Container, in den die Seiten geladen werden)

    ```html
    <div class="container" ng-view></div>
    ```

### Die Konfiguration

#### Die Routen

Die HTML-Seite steht, weiter geht es mit der Konfiguration der Anwendung, den **Routen** (Datei app.js)

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

> **Hinweis:** Um angular vollständig statisch zu machen, deaktiviere ich den **html5Mode** und füge ein **hashPrefix** hinzu.

#### Die Controller

Da die **Routen** nun angelegt sind, bleiben die Controller in der Datei main.js zu programmieren; ein einfaches Array von Objekten wird erstellt und in den **$scope** der Seite gelegt:

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

Und in der Datei menu.js wird eine Methode ergänzt, die den ausgewählten Menüpunkt hervorhebt:

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

#### Die Templates

Wir brauchen eine Teilseite main.html; der Code sieht so aus:

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
  <!-- die Direktive ng-repeat liest direkt das Objekt awesomeThings, das in den $scope gelegt wurde-->
  <div ng-repeat="thing in awesomeThings">
    <h4>{{thing.title}}</h4>
    <p>{{thing.description}}</p>
  </div>
</div>

<!-- include angular -->
<div ng-include="'partials/footer.html'"></div>
```

Außerdem eine Teilseite menu.html und eine weitere footer.html:

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

## Die vollständige Seite index.html

Zum Schluss muss noch der Style-Teil in den head der Seite; wie der Generator behalte ich [Bootstrap][2], aber in der Version **css only**, und füge [font-awesome][3] für die Icons hinzu:

```html
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
<link rel="stylesheet" href="styles/main.css">
```

Das ergibt folgende Seite index.html:

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

## Quellcode

Der **vollständige** Code des Projekts liegt auf [github][4], die Demo ist [hier][5].

Für die Demo habe ich auf [bootsnipp][6] ein Beispiel für **Über uns**- und **Kontakt**-Seiten für Bootstrap geholt.

[pb1]: #!reminders/angular-js
[1]: http://angularjs.org/
[2]: http://getbootstrap.com/css/
[3]: http://fortawesome.github.io/Font-Awesome/
[4]: https://github.com/YoannB/angular-static
[5]: http://yoannb.github.io/angular-static
[6]: http://bootsnipp.com
