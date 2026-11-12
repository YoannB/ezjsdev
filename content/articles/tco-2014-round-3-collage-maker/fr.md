---
title: "TCO 2014 - Round 3 - CollageMaker"
slug: tco-2014-round-3-collage-maker
date: 2014-07-09
description: "Top Coder Open 2014 Round 3 : problème CollageMaker."
image: /articles/tco-2014-round-3-collage-maker/visualizer.png
---

_TopCoder TCO 2014 (09-07-2014)_

## Round 3 : CollageMaker

L'énoncé complet du problème posé pour le dernier round du TCO est disponible [ici][1].

Petit résumé du problème, nous avons :

- Un répertoire contenant 1000 images en niveaux de gris
- Pour chaque cas de test, on nous donne une image cible de longueur et largeur maximum de 300 pixels et 200 autres images de longueur et largeur maximum de 100 pixels.

Le but du jeu est de reconstituer l'image cible à l'aide des 200 autres images.

La formule de calcul du score est obtenue après le calcul des différences de niveaux de gris entre chaque pixel.

Il faut implémenter une méthode **compose** qui prend en paramètre un tableau d'entiers **data**. Le tableau est composé de 201 images décrites comme ceci :

- un entier H pour la hauteur de l'image
- un entier W pour la largeur de l'image
- et HxW entiers correspondant aux pixels de l'image (niveaux de gris de 0 à 255)

Les images n'ont pas besoin de conserver leur rapport de taille longueur / largeur.

> **Remarque :** les images ne peuvent pas être retournées ni avoir une longueur supérieure ou une largeur supérieure à celles fournies en paramètre.

## Score

Sur TopCoder, le principe de scoring est le suivant :

- le résultat de chaque cas de test de la solution est comparé au meilleur résultat du cas de test parmi l'ensemble des participants à l'instant du **submit** de la solution sur le site.
- le premier pour le cas de test a 10000 points et les autres ont un score proportionnel
- le score total est la somme de chaque score des cas de test normalisé avec le score du meilleur

## Exécution

Règles :

- Temps limite : 10 secondes par cas de test
- Mémoire : 1024MB
- Taille du code : 256ko
- Compilation : 60 secondes

Le manuel ainsi qu'un **JAR** exécutable de test sont disponibles sur le [site][2].

On peut même voir le [code source][3] du visualiseur fait en java.

Voici le résultat de mon algorithme pour le cas de test 1 :

![Capture du visualiseur](/articles/tco-2014-round-3-collage-maker/visualizer.png)

## Solution

- J'ai choisi dans un premier temps de découper l'image cible en prenant la largeur / longueur minimum disponible des 200 images fournies et en utilisant un algorithme **greedy** pour les positionner.
- J'ai ensuite fait diminuer la taille des zones pour optimiser le score.
- Pour chaque image, j'ai ensuite tenté de les étendre en hauteur et en largeur.
- Puis je trie les images par score relatif décroissant et je découpe les images ayant les scores les plus importants en 4 sous-parties (je suis allé dans l'extrêmement simple, les meilleurs scores ont découpé soit en largeur soit en longueur).
- Je termine le traitement par un algorithme **SA** (simulated annealing) pour échanger les images entre elles.

Score de submission temporaire : 809 648,79 et final : **807 646,95**

Pour les 10 premières grilles voici mes scores :

- 0\) 43.986646795320695
- 1\) 49.63596847717053
- 2\) 48.804655970967
- 3\) 41.80158988204476
- 4\) 50.4940321863105
- 5\) 64.45040072880737
- 6\) 53.89180991510608
- 7\) 58.715086564568374
- 8\) 75.52324432473311
- 9\) 56.757426627595926

**Remarque :** on aurait pu croire à de l'analyse d'image mais les meilleurs scores du marathon prouvent bien le contraire, voici une capture du premier **[ainu7][ainu7]** :

![ainu7-seed1](/articles/tco-2014-round-3-collage-maker/ainu7.png)

[1]: http://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=16012&pm=13246
[2]: http://community.topcoder.com/contest/problem/CollageMaker/manual.html
[3]: http://www.topcoder.com/contest/problem/CollageMaker/CollageMakerVis.java
[ainu7]: http://community.topcoder.com/tc?module=MemberProfile&cr=22653720
