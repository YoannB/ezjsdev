---
title: "TCO 2014 - Round 1 - SquareRemover"
slug: tco-2014-round-1-square-remover
date: 2014-04-24
description: "Top Coder Open 2014 Round 1 : problème SquareRemover."
image: /articles/tco-2014-round-1-square-remover/visualizer.png
---

_TopCoder TCO 2014 (24-04-2014)_

## Round 1 : SquareRemover

L'énoncé complet du problème posé cette année pour le premier round du TCO est disponible [ici][1].

Petit résumé du problème, nous avons :

- Une grille de NxN (8<=N<=16) dont chaque cellule est coloriée par une des couleurs (4<=couleurs<=6)
- Un buffer de zones suivantes, chaque zone est composée de 4 cellules.

Le but du jeu étant de réunir les cellules de mêmes couleurs par 4 qui sont détruites et ensuite remplacées par la zone suivante du buffer.

Chaque zone de 4 cellules détruites rapporte **1 point**.

Il faut implémenter une méthode **playIt** qui prend en paramètres un entier **colors**, un tableau de string **board** et un entier **startSeed**.

- colors : correspond au nombre de couleurs possibles pour la grille
- board : représente la grille sous la forme ["0123","2031","0221","3201"]
- startSeed : est l'entier qui permet de générer la nouvelle zone

    ```
    A[0] = startSeed
    A[i] = (A[i-1] * 48271) MOD 2147483647
    ```

La méthode **playIt** doit retourner 10000 mouvements soit un tableau de 30000 entiers :

- 3\*i : ligne de la cellule à bouger
- 3\*i+1 : colonne de la cellule à bouger
- 3\*i+2 : direction dans laquelle bouger la cellule (0 - up, 1 - right, 2 - down, 3 - left)

Un mouvement revient à échanger la couleur de la cellule à bouger avec la cellule située dans la direction.

## Score

Sur TopCoder, le principe de scoring est le suivant :

- le résultat de chaque cas de test de la solution est comparé au meilleur résultat du cas de test parmi l'ensemble des participants à l'instant du **submit** de la solution sur le site.
- le premier pour le cas de test a 10000 points et les autres ont un score proportionnel
- le score total est la somme de chaque score des cas de test normalisé avec le score du meilleur

## Exécution

Règles :

- Temps limite : 30 secondes par cas de test
- Mémoire : 1024MB
- Taille du code : 1MB
- Compilation : 60 secondes

Le manuel ainsi qu'un **JAR** exécutable de test sont disponibles sur le [site][2].

On peut même voir le [code source][3] du visualiseur fait en java.

![Capture du visualiseur](/articles/tco-2014-round-1-square-remover/visualizer.png)

Le but du jeu étant de réunir les couleurs par 4 :

![Exemple d'un mouvement normal](/articles/tco-2014-round-1-square-remover/move-1.png)

Il est possible de faire des combinaisons lors d'un unique mouvement et ainsi cumuler les points :

![Exemple d'un mouvement double](/articles/tco-2014-round-1-square-remover/move-2.png)

## Solution

N'ayant pas eu beaucoup de temps et n'étant pas un expert (seulement 4/5 marathons depuis 1 an) comparé à la plupart des participants qui font aussi des matchs de 8h chrono toute l'année et la plupart des marathons, mon score final n'est pas le meilleur et de loin, mais l'algorithme de ma solution est celui que tous les tops scores ont utilisé, donc je me permets de le présenter ici un peu plus en détail.

Cet algorithme est [**Beam Search**][4] ou [Algorithme de recherche en faisceau][5].

Le principe est de jouer tous les coups d'une itération et de conserver parmi les meilleures solutions un nombre de solutions que l'on appelle **WIDTH**. Ensuite pour chacune de ces solutions, on relance tous les coups et on conserve à nouveau les **WIDTH** meilleures.

La grande difficulté pour appliquer l'algorithme à ce problème est la faisabilité en termes mathématiques du nombre de solutions possibles : (16 \* 16 \* 4) ^ 10000 -> infini

Il est donc nécessaire de limiter le nombre de points à jouer à chaque itération et également de limiter la **WIDTH** de l'algorithme.

Pseudo code JAVA :

```java
 private State[] beamSearch(int WIDTH) {
	//init
	root = new State(0);
	State[] current = new State[4*points.length], currentChildren;
	State state;
	int count = 0;
	for (int p = 0; p < betterPoints.length; p++) {
		for (int d = 0; d < 4; d++) {
			if (p2 > -1/**point valide**/) {
				current[count++] = root.first(p1,p2,d);
			}
		}
	}
	while (true) {
		currentChildren = new State[current.length * length];
		int children = 0;
		for (int i = 0; i < current.length; i++) {
			for (int p = 0; p < betterPoints.length; p++) {
				for (int d = 0; d < 4; d++) {
					if (p2 > -1/**point valide**/) {
						currentChildren[children++] = current[i].next(p1,p2,d);
					}
				}
			}
		}
		Arrays.sort(currentChildren);
		if (children > WIDTH) {
			current = new State[WIDTH];
			System.arraycopy(sliceChildren, 0, current, 0, WIDTH);
		} else {
			current = sliceChildren;
		}
		if (current[0].level == 10000) break;
	}
	return current;
 }
```

Pour le choix des meilleurs points à bouger, j'ai choisi de prendre parmi les points les plus près de zone de 3 cellules de mêmes couleurs et ensuite s'il n'y en avait pas, j'ai considéré par paire les cellules les plus proches de zone de 2 cellules de mêmes couleurs.

Score de submission temporaire : 446164,62 et final : **418829,75**

Pour les 10 premières grilles voici mes scores :

- 0\) 7440.0
- 1\) 10536.0
- 2\) 6999.0
- 3\) 9827.0
- 4\) 5600.0
- 5\) 10571.0
- 6\) 10161.0
- 7\) 7311.0
- 8\) 7497.0
- 9\) 7139.0

Le premier a environ le double pour chaque score !!!

**Remarque :** Dommage, mes scores étaient meilleurs mais j'avais une petite erreur dans mon code final qui a fait que de nombreux cas de tests ont échoué, la prochaine fois, j'espère que je serai plus vigilant.

[1]: http://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=15938&pm=13132
[2]: http://www.topcoder.com/contest/problem/SquareRemover/manual.html
[3]: http://www.topcoder.com/contest/problem/SquareRemover/SquareRemoverVis.java
[4]: http://en.wikipedia.org/wiki/Beam_search
[5]: http://fr.wikipedia.org/wiki/Algorithme_de_recherche_en_faisceau
