---
title: "TCO 2014 - Round 2 - RectanglesAndHoles"
slug: tco-2014-round-2-rectangles-and-holes
date: 2014-06-11
description: "Top Coder Open 2014 Round 2 : problème RectanglesAndHoles."
image: /articles/tco-2014-round-2-rectangles-and-holes/visualizer.png
---

_TopCoder TCO 2014 (11-06-2014)_

## Round 2 : RectanglesAndHoles

L'énoncé complet du problème posé pour le deuxième round du TCO est disponible [ici][1].

Petit résumé du problème, nous avons :

- Un plan de coordonnées x et y comprises entre -1000000 et 1000000
- Et deux listes d'entiers compris entre 100 et 1000 correspondant aux 2 côtés d'un rectangle.

Le but du jeu est de former des "trous" avec les rectangles.

La formule de calcul du score est **nombre de trous x nombre de trous x somme de l'aire des trous**.

Il faut implémenter une méthode **place** qui prend en paramètres les deux tableaux d'entiers **A** et **B**.

- A : correspond aux distances du premier côté de chaque rectangle
- B : correspond aux distances du deuxième côté de chaque rectangle

Pour la suite, je vais considérer le rectangle suivant avec ses 4 sommets (a,b,c,d) :

```
a__b
|  |
|__|
c  d
```

La méthode **place** doit retourner la position de chaque rectangle, soit ses coordonnées x et y pour le sommet **c** et le sens du rectangle en fonction des côtés qui ont été fournis en paramètres :

- 3\*i : coordonnée x
- 3\*i+1 : coordonnée y
- 3\*i+2 : 0 ou 1 selon que l'on souhaite inverser ou non le sens du rectangle

> **Remarque :** le sens va permettre de maîtriser la longueur et la largeur de chaque rectangle.

## Score

Sur TopCoder, le principe de scoring est le suivant :

- le résultat de chaque cas de test de la solution est comparé au meilleur résultat du cas de test parmi l'ensemble des participants à l'instant du **submit** de la solution sur le site.
- le premier pour le cas de test a 10000 points et les autres ont un score proportionnel
- le score total est la somme de chaque score des cas de test normalisé avec le score du meilleur

## Exécution

Règles :

- Temps limite : 10 secondes par cas de test
- Mémoire : 1024MB
- Taille du code : 1MB
- Compilation : 60 secondes

Le manuel ainsi qu'un **JAR** exécutable de test sont disponibles sur le [site][2].

On peut même voir le [code source][3] du visualiseur fait en java.

Voici le résultat de mon algorithme pour le cas de test 1 :

![Capture du visualiseur](/articles/tco-2014-round-2-rectangles-and-holes/visualizer.png)

## Solution

- Je n'ai pas pris beaucoup de temps pour coder ma solution, je suis parti sur l'idée de faire un **gros trou** et un **maximum de petits trous** à côté. Pour cela, j'ai pris les rectangles et les ai triés selon leur côté le plus grand (en retournant les rectangles dès le début).
- J'ai fait la somme des côtés les plus grands pour déterminer une longueur **D** d'environ **TOTAL des côtés / COEFFICIENT** avec COEFFICIENT pris parmi la liste suivante {7, 6.75, 7.25, 6.25, 6.5, 7.5}.
- Ensuite, j'ai tracé un carré de côté **D**/4 et je l'ai transformé en cercle en étirant chaque côté.
- Pour finir avec les rectangles restants, j'ai utilisé l'algorithme **SA** pour me permettre de faire le plus de petits trous.

Score de submission temporaire : 489 126,27 et final : **488 719,07**

Pour les 10 premières grilles voici mes scores :

- 0\) 6.6238253331408E13
- 1\) 3.70667129175E13
- 2\) 4.890804515948E14
- 3\) 4.17648160217752E14
- 4\) 3.60438489048E12
- 5\) 1.369866809428E12
- 6\) 2.330415945663232E15
- 7\) 1.7676430721733E13
- 8\) 3.4037179493805E13
- 9\) 3.52032810637956E14

[1]: http://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=15982&pm=13189
[2]: http://www.topcoder.com/contest/problem/RectanglesAndHoles/manual.html
[3]: http://www.topcoder.com/contest/problem/RectanglesAndHoles/RectanglesAndHolesVis.java
