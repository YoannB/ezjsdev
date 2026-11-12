---
title: "TCO 2015 - Round 3 - PegJump"
slug: tco-2015-round-3-peg-jump
date: 2015-07-22
description: "Top Coder Open 2015 Round 3 : problème PegJump."
image: /articles/tco-2015-round-3-peg-jump/pegjump-seed1-init.png
---

_TopCoder TCO 2015 (22-06-2015)_

## Round 3 : PegJump

> Un dérivé du SOLITAIRE

L'énoncé complet du problème posé pour le troisième round du TCO 2015 est disponible [ici][1].

Petit résumé du problème, nous avons :

- Un plan de coordonnées x et y comprises entre 20 et 60, contenant la position des **peg**.
- Et une liste d'entiers correspondant aux valeurs des **peg**.

Le but du jeu est comme au solitaire de faire des sauts de **peg** pour _manger_ les autres mais avec comme principal objectif de faire des _chaînes_ de sauts de **pegs**.

La formule de calcul du score est **nombre de sauts de peg x somme des valeurs des peg mangés**.

Il faut implémenter une méthode **getMoves** qui prend en paramètres un tableau d'entiers **pegValue** et un tableau de string **board**.

- pegValue : correspond aux valeurs de chaque type de **peg**
- board : correspond au plan et contient les **peg** avec leur type

La méthode **getMoves** doit retourner la liste des sauts de **peg**, en partant des coordonnées x et y du **peg** qui doit sauter et la direction Up, Down, Left, Right du saut. Lorsqu'on enchaîne les sauts, il suffit de concaténer les directions à la suite :

- exemple d'un saut simple : "1 5 U"
- exemple d'un _big_ saut : "1 5 UDLRUDLLR"

## Score

Cette année sur TopCoder, le principe de scoring a changé et est désormais le suivant :

- le résultat de chaque cas de test de la solution est comparé aux résultats du cas de test de l'ensemble des participants à l'instant du **submit** de la solution sur le site, si on a plus on marque 1 point, si les scores sont identiques on marque 0.5 point et sinon 0 point.
- le score total est la somme de chaque score des cas de test normalisé avec le nombre de candidats

## Exécution

Règles :

- Temps limite : 15 secondes par cas de test
- Mémoire : 1024MB
- Taille du code : 1MB
- Compilation : 30 secondes

Le manuel ainsi qu'un **JAR** exécutable de test sont disponibles sur le [site][2].

On peut même voir le [code source][3] du visualiseur fait en java.

Voici le résultat de mon algorithme pour le cas de test 1 :

![Exemple seed 1 init](/articles/tco-2015-round-3-peg-jump/pegjump-seed1-init.png)

![Exemple seed 1 final](/articles/tco-2015-round-3-peg-jump/pegjump-seed1-final.png)

## Solution

- Très loin des scores des premiers, je ne me suis pas assez préoccupé des sauts enchaînés par un seul pion...
- Test de plusieurs algorithmes : l'algorithme de parcours en profondeur DFS (Depth First Search), Beam Search ...
- Découpage des grosses grilles en 2, 4, 9 ou 16 parties pour les traiter plus rapidement
- Utilisation d'un Beam pour simplifier les grilles avant de les traiter (parcours de toutes les cellules 4 par 4 et faire des sauts tant que 4 cellules avec _peg_)
- Trouver la meilleure séquence de saut et ensuite tenter de l'améliorer

Score de submission temporaire : 98 869,77 et final : **110 956,41**

Pour les 10 premières grilles voici mes scores :

- 0\) 13004.0
- 1\) 26318.0
- 2\) 4410.0
- 3\) 61322.0
- 4\) 60190.0
- 5\) 98961.0
- 6\) 22494.0
- 7\) 65364.0
- 8\) 54286.0
- 9\) 3312.0

[1]: https://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=16472&pm=13843
[2]: http://www.topcoder.com/contest/problem/PegJumping/manual.html
[3]: http://www.topcoder.com/contest/problem/PegJumping/PegJumpVis.java
