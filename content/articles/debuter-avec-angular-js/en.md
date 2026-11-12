---
title: "Getting started with Angular.JS"
slug: getting-started-with-angular-js
date: 2014-03-09
description: "Getting started with Angular.JS by example."
---

## Project structure

Here is a static example of an angular.js project based on the code of the generator-angular generator ([reminder][pb1]).

![Structure](/articles/debuter-avec-angular-js/angular_static.png)

## Basic Angular.JS setup

### The imports

To begin with, add the script tags at the end of the body:

- [angular.js][1]

    ```html
    <script src="http://code.angularjs.org/1.2.15/angular.js"></script>
    <script src="http://code.angularjs.org/1.2.15/angular-route.js"></script>
    ```

- The project's scripts

    ```html
    <script src="app.js"></script>
    <script src="main.js"></script>
    ```

> **Note:** with the scripts placed at the end of the body, angular loads by itself.

### The declaration

Next, the directives must be added to the html page:

- ng-app (name of the angular module): declaration of the angular application

    ```html
    <body ng-app="angularApp">
    ```

    The declaration can also be made on the 'head' (to customize the site title, for example); in that case angular provides an **xmlns** (for old browsers that would not like all the new angular attributes):

    ```html
    <html xmlns:ng="http://angularjs.org" id="ng-app" ng-app="angularApp">
    ```

- ng-view (the container into which the pages will be loaded)

    ```html
    <div class="container" ng-view></div>
    ```

### The configuration

#### The routes

The HTML page is done, let's move on to configuring the application, the **routes** (app.js file)

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

> **Note:** to make angular fully static, I disable **html5Mode** and add a **hashPrefix**.

#### The controllers

Now that the **routes** are created, the controllers remain to be coded in the main.js file; a simple array of objects is created and put in the page's **$scope**:

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

And in the menu.js file, a method that highlights the selected menu item is added:

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

#### The templates

We need a main.html partial page; here is its code:

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
  <!-- the ng-repeat directive directly reads the awesomeThings object that was put in the $scope-->
  <div ng-repeat="thing in awesomeThings">
    <h4>{{thing.title}}</h4>
    <p>{{thing.description}}</p>
  </div>
</div>

<!-- include angular -->
<div ng-include="'partials/footer.html'"></div>
```

As well as a menu.html partial page and a footer.html one:

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

## The complete index.html page

To finish, the style part must be added to the head of the page; like the generator, I keep [Bootstrap][2] but in its **css only** version, and I add [font-awesome][3] for the icons:

```html
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
<link rel="stylesheet" href="styles/main.css">
```

Which gives this index.html page:

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

## Source code

The **complete** code of the project is on [github][4] and the demo is [here][5].

For the demo, I went to [bootsnipp][6] to get an example of **about** and **contact** pages made for Bootstrap.

[pb1]: #!reminders/angular-js
[1]: http://angularjs.org/
[2]: http://getbootstrap.com/css/
[3]: http://fortawesome.github.io/Font-Awesome/
[4]: https://github.com/YoannB/angular-static
[5]: http://yoannb.github.io/angular-static
[6]: http://bootsnipp.com
