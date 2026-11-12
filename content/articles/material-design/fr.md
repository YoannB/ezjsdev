---
title: "Simple Page Material Design"
slug: page-simple-material-design
date: 2015-05-25
description: "Material Design : un template simple pour débuter."
image: /articles/material-design/material-design.css.png
---

Création d'un fichier css pour utiliser facilement toutes les couleurs du Material Design, récupérable à l'aide de bower [ICI][3] et d'un fichier pour le Design [ICI][4].

Mise en place à l'aide d'Angular, UI Bootstrap, Bootstrap et Font-Awesome d'une simple page Material Design :

```html
<head>
 <link rel="stylesheet" href="material-design.min.css">
</head>
<body data-ng-app="materialDesign" data-ng-controller="PageCtrl" data-ng-class="{ 'menu-open': menuOpen||menuOpenRight, 'right': menuOpenRight }">
	<header class="navbar navbar-fixed-top bg-indigo" data-ng-class="[ menuOpen||menuOpenRight ? 'darken-2' : '' ]" ...></header>
	<nav class="menu" data-ng-class="{ 'open': menuOpen }" ...></nav>
	<nav class="menu menu-right" data-ng-class="{ 'open': menuOpenRight }" ...></nav>
    <div id="navbar-back" class="navbar-back" data-ng-class="{ 'menu-open': menuOpen||menuOpenRight }"></div>
    <section class="content">
        <section class="content-heading bg-indigo">
            <h1>material-design.css</h1>
        </section>
        <section class="container" role="content">
			Content
		</section>
	</section>
    <footer></footer>
</body>
```

Et partie Javascript Angular JS :

```javascript
angular.module('materialDesign', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap'])
    .controller('PageCtrl', ['$scope', '$window', '$location', '$anchorScroll', function ($scope, $window, $location, $anchorScroll) {

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function () {
            $scope.menuOpen = false;
            $scope.menuOpenRight = false;
            $scope.dropdownFbtnOpen = false;
        });

        // observe scroll of window
        angular.element($window).bind('scroll', function () {
            var scrollTop = $window.scrollY || $window.pageYOffset || $window.document.documentElement.scrollTop;
            var body = angular.element(document.body);
            if (scrollTop > 100) {
                body.addClass('page-offset');
            } else {
                body.removeClass('page-offset');
            }
            if (scrollTop > 0) {
                body.addClass('page-scroll');
            } else {
                body.removeClass('page-scroll');
            }
        });

        $scope.scrollTop = function () {
            $location.hash();
            $anchorScroll();
        };

        /** Menu Design **/
        $scope.menuOpen = false;
        $scope.menuOpenRight = false;
		$scope.dropdownFbtnOpen = false;
		$scope.toggleFbtn = function () {
		    $scope.dropdownFbtnOpen = !$scope.dropdownFbtnOpen;
		};
        angular.element(document.getElementById('navbar-back')).on('mousedown', function () {
            $scope.menuOpen = false;
            $scope.menuOpenRight = false;
            $scope.dropdownFbtnOpen = false;
            $scope.$apply();
        });
        $scope.toggleMenu = function () {
            $scope.menuOpen = !$scope.menuOpen;
            $scope.menuOpenRight = false;
        };
        $scope.toggleProfile = function () {
            $scope.menuOpen = false;
            $scope.menuOpenRight = !$scope.menuOpenRight;
        };
    }]
);
```

Page de démonstration [ICI][5].

Site google du Material Design et de ses principes [ici][1].

Rappel de la palette de couleurs (version complète [ici][2]) :

| Couleur     | Code    |
| ----------- | ------- |
| red         | #f44336 |
| pink        | #e91e63 |
| purple      | #9c27b0 |
| deep-purple | #673ab7 |
| indigo      | #3f51b5 |
| blue        | #2196f3 |
| light-blue  | #03a9f4 |
| cyan        | #00bcd4 |
| teal        | #009688 |
| green       | #4caf50 |
| light-green | #8bc34a |
| lime        | #cddc39 |
| yellow      | #ffeb3b |
| amber       | #ffc107 |
| orange      | #ff9800 |
| deep-orange | #ff5722 |
| brown       | #795548 |
| grey        | #9e9e9e |
| blue-grey   | #607d8b |

[1]: http://www.google.com/design/spec/material-design/introduction.html
[2]: http://www.google.com/design/spec/style/color.html#color-color-palette
[3]: https://github.com/YoannB/material-colors.css
[4]: https://github.com/YoannB/material-design.css
[5]: http://yoannb.github.io/material-design.css/
