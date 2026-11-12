---
title: "TCO 2015 - Round 2 - PathDefense"
slug: tco-2015-round-2-path-defense
date: 2015-07-20
description: "Top Coder Open 2015 Round 2 : problème PathDefense."
image: /articles/tco-2015-round-2-path-defense/pathdefense-seed1-init.png
---

_TopCoder TCO 2015 (25-05-2015)_

## Round 2 : PathDefense

L'énoncé complet du problème posé pour le deuxième round du TCO 2015 est disponible [ici][1].

Petit résumé du problème, nous avons :

- Un plan de coordonnées x et y comprises entre 20 et 60 (bornes incluses) avec des bases et des chemins menant aux bases
- L'argent disponible au départ _money_ (initialisé avec la somme des différentes valeurs des _towers_)
- La vie des _bestioles_, donnée par _creepHealth_, indique la vie de départ de chaque bestiole ; à chaque 500ème itération (500,1000,1500) la vie des bestioles va doubler.
- La somme d'argent _creepMoney_ que l'on gagne après avoir tué une bestiole
- Le nombre de types de tours de défense disponibles _towerType_ pour tuer les bestioles
- Les bestioles _creep_ avec leur position et leur vie restante
- la vie de chacune des bases _baseHealth_

Le but du jeu est de défendre à l'aide de **towers** des **bases** qui démarrent chacune avec 1000 points de vie, qui sont attaquées par les bestioles **creep** et de maximiser l'argent final dans la caisse.

Le score est donné par l'argent **money** (somme du reste de la vie de chaque base avec l'argent dans la caisse).

Il faut implémenter une méthode **init** qui prend en paramètres le plan _board_, l'entier _money_, l'entier _creepHealth_, l'entier _creepMoney_ et l'entier _towerType_.

- board : correspond au plan de coordonnées
- money : correspond à l'argent de départ
- creepHealth : correspond à la vie de départ des bestioles
- creepMoney : correspond à l'argent gagné après avoir tué une bestiole
- towerType : correspond aux types de tours de défense disponibles

Et une méthode **placeTowers** qui sera appelée _2000 fois_ par le visualiseur et qui prend en paramètres le tableau des _creep_, la valeur actuelle de la caisse _money_ et la vie restante de chaque base _baseHealth_.

- creep : correspond aux coordonnées des bestioles dans le plan
- money : correspond à l'argent actuellement dans la caisse
- baseHealth : correspond à la vie actuelle des bases

> **Remarque :** les _creep_ ne se déplacent que suivant les chemins menant aux bases (chaque base peut avoir 0 à n chemins menant à elle).

> Les _towers_ ont un périmètre d'attaque, une force et un coût. Le périmètre d'attaque **range** étant défini par : si la tour est en (X1,Y1) et son _range_ est R, alors la bestiole en (X2,Y2) sera attaquée ssi `(X1-X2)*(X1-X2)+(Y1-Y2)*(Y1-Y2)<=R*R`.

## Score

Cette année sur TopCoder, le principe de scoring a changé et est désormais le suivant :

- le résultat de chaque cas de test de la solution est comparé aux résultats du cas de test de l'ensemble des participants à l'instant du **submit** de la solution sur le site, si on a plus on marque 1 point, si les scores sont identiques on marque 0.5 point et sinon 0 point.
- le score total est la somme de chaque score des cas de test normalisé avec le nombre de candidats multiplié par 100000.

## Exécution

Règles :

- Temps limite : 20 secondes par cas de test
- Mémoire : 1024MB
- Taille du code : 1MB
- Compilation : 60 secondes

Le manuel ainsi qu'un **JAR** exécutable de test sont disponibles sur le [site][2].

On peut même voir le [code source][3] du visualiseur fait en java.

Voici le résultat de mon algorithme pour le cas de test 1 :

![Seed 1 init](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-init.png)

![Seed 1 first tower](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-firsttower.png)

![Seed 1 final](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-final.png)

Et pour le cas de test 2 :

![Seed 2 init](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-init.png)

![Seed 2 first tower](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-firsttower.png)

![Seed 2 final](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-final.png)

## Solution

- j'ai juste utilisé l'algorithme A-star pour simuler le déplacement des bestioles sur le plan
- et une formule prenant en compte l'ensemble des paramètres pour déterminer le nombre de tours à acheter
- positionnement greedy des tours en fonction de leur puissance de frappe
- de nombreuses petites optimisations de code pour les différents cas de tests

Score de submission temporaire : 597 041,42 et final : **564 610,95**

Pour les 10 premières grilles voici mes scores :

- 0\) 4721.0
- 1\) 19310.0
- 2\) 11505.0
- 3\) 9297.0
- 4\) 4404.0
- 5\) 7527.0
- 6\) 7373.0
- 7\) 33795.0
- 8\) 7670.0
- 9\) 349.0

[1]: https://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=16471&pm=13805
[2]: http://www.topcoder.com/contest/problem/PathDefense/manual.html
[3]: http://www.topcoder.com/contest/problem/PathDefense/PathDefenseVis.java
