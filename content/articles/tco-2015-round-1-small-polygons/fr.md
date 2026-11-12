---
title: "TCO 2015 - Round 1 - SmallPolygons"
slug: tco-2015-round-1-small-polygons
date: 2015-06-20
description: "Top Coder Open 2015 Round 1 : problème SmallPolygons."
image: /articles/tco-2015-round-1-small-polygons/seed-5-np-1368-n-6-polygonization-180sec.png
---

_TopCoder TCO 2015 (20-04-2015)_

## Round 1 : SmallPolygons

L'énoncé complet du problème posé pour le premier round du TCO 2015 est disponible [ici][1].

Petit résumé du problème, nous avons :

- Un plan de coordonnées x et y comprises entre 0 et 699
- Une liste de points dans le plan.
- Et un nombre maximum de polygones devant être construits

Le but du jeu est de former des polygones avec les points tout en ne dépassant pas le nombre de polygones donné et en minimisant l'aire des polygones ainsi créés.

La formule de calcul du score est **somme des aires des polygones**.

Il faut implémenter une méthode **choosePolygons** qui prend en paramètres le tableau d'entiers **points** et un entier **N**.

- points : correspond à la liste des points
- N : correspond au maximum de polygones

La méthode **choosePolygons** doit retourner chaque polygone, sous forme de tableau des index des points qui doivent former un polygone.

> l'ordre des points de la liste doit être sauvé pour permettre d'identifier chaque point pour la suite

## Score

Cette année sur TopCoder, le principe de scoring a changé et est désormais le suivant :

- le résultat de chaque cas de test de la solution est comparé aux résultats du cas de test de l'ensemble des participants à l'instant du **submit** de la solution sur le site, si on a plus on marque 1 point, si les scores sont identiques on marque 0.5 point et sinon 0 point.
- le score total est la somme de chaque score des cas de test normalisé avec le nombre de candidats

## Exécution

Règles :

- Temps limite : 10 secondes par cas de test
- Mémoire : 1024MB
- Taille du code : 1MB
- Compilation : 30 secondes

Le manuel ainsi qu'un **JAR** exécutable de test sont disponibles sur le [site][2].

On peut même voir le [code source][3] du visualiseur fait en java.

Voici le résultat de mon algorithme pour quelques cas de tests :

![Capture seed 1](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed1.png)

![Capture seed 2](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed2.png)

![Capture seed 5](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed5-saone.png)

## Solution

> Je suis passé à côté d'une chose, la "polygonization", l'algorithme qui permettait de construire un polygone simple "rapidement" (j'ai utilisé à la place un tri polaire des points -> ce qui donne une étoile plus dure à optimiser et à découper par la suite...)

![Capture seed 5 sortclockwise](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed5-sortclockwise.png)

> **polygonization** :
>
> 1. calcul du triangle avec l'aire minimum parmi la liste de points (ce sont les 3 premiers points ordonnés)
> 2. pour chaque "vertice" (côté du polygone formé par les points i et i + 1), calcul du milieu du vertice et parmi tous les points restants, on garde le + près d'un vertice
> 3. ajout du point entre les 2 points du vertice du polygone
> 4. recommencer 2 et 3 jusqu'à ce que tous les points soient utilisés

Seed 5 avec **polygonization** :

![Capture seed 5 polygonization](/articles/tco-2015-round-1-small-polygons/seed-5-np-1368-n-6-polygonization-180sec.png)

Et ma solution :

- tri polaire des points pour obtenir des polygones valides (obtention d'une solution minimum)

    ![Capture seed 3 sortClockWise](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3-sortclockwise.png)

- utilisation de l'algorithme K-Means pour partager les points en N listes de points, puis réordonnancement des points avec le tri polaire

    ![Capture seed 3 k-means](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3-kmeans.png)

- optimisation des polygones à l'aide d'un algorithme SA (en réalisant des échanges de points entre les polygones)

    ![Capture seed 3](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3.png)

> pour les _petites_ grilles, utilisation d'un algorithme Beam Search pour trouver _la_ solution la meilleure...

Score de submission temporaire : 69,40 et final : **1 382,88**

Meilleur classement en TCO : [46ème][4] et code source de la solution [ici][5].

Pour les 10 premières grilles voici mes scores :

- 0\) 8296.0
- 1\) 28989.5
- 2\) 51429.0
- 3\) 17896.0
- 4\) 160403.5
- 5\) 29087.0
- 6\) 15146.5
- 7\) 50039.0
- 8\) 81954.0
- 9\) 62017.5

[1]: https://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=16445&pm=13702
[2]: http://www.topcoder.com/contest/problem/SmallPolygons/manual.html
[3]: http://www.topcoder.com/contest/problem/SmallPolygons/SmallPolygonsVis.java
[4]: http://community.topcoder.com/longcontest/stats/?module=ViewOverview&rd=16445
[5]: http://community.topcoder.com/longcontest/?module=ViewProblemSolution&pm=13702&rd=16445&cr=23141803&subnum=5
