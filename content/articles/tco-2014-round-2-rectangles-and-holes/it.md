---
title: "TCO 2014 - Round 2 - RectanglesAndHoles"
slug: tco-2014-round-2-rectangles-and-holes
date: 2014-06-11
description: "Top Coder Open 2014 Round 2: il problema RectanglesAndHoles."
image: /articles/tco-2014-round-2-rectangles-and-holes/visualizer.png
---

_TopCoder TCO 2014 (11-06-2014)_

## Round 2: RectanglesAndHoles

Il testo completo del problema proposto per il secondo round del TCO è disponibile [qui][1].

Breve riassunto del problema, abbiamo:

- Un piano con coordinate x e y comprese tra -1000000 e 1000000
- E due liste di interi compresi tra 100 e 1000 corrispondenti ai 2 lati di un rettangolo.

Lo scopo del gioco è formare dei "buchi" con i rettangoli.

La formula di calcolo del punteggio è **numero di buchi x numero di buchi x somma dell'area dei buchi**.

Bisogna implementare un metodo **place** che riceve come parametri i due array di interi **A** e **B**.

- A: corrisponde alle lunghezze del primo lato di ogni rettangolo
- B: corrisponde alle lunghezze del secondo lato di ogni rettangolo

Di seguito considererò il seguente rettangolo con i suoi 4 vertici (a,b,c,d):

```
a__b
|  |
|__|
c  d
```

Il metodo **place** deve restituire la posizione di ogni rettangolo, cioè le sue coordinate x e y per il vertice **c** e l'orientamento del rettangolo in funzione dei lati forniti come parametri:

- 3\*i: coordinata x
- 3\*i+1: coordinata y
- 3\*i+2: 0 o 1 a seconda che si voglia invertire o meno l'orientamento del rettangolo

> **Osservazione:** l'orientamento permette di controllare la lunghezza e la larghezza di ogni rettangolo.

## Punteggio

Su TopCoder, il sistema di punteggio è il seguente:

- il risultato di ogni caso di test della soluzione viene confrontato con il miglior risultato di quel caso di test tra tutti i partecipanti al momento del **submit** della soluzione sul sito.
- il primo del caso di test ottiene 10000 punti e gli altri un punteggio proporzionale
- il punteggio totale è la somma dei punteggi dei casi di test normalizzata rispetto al punteggio del migliore

## Esecuzione

Regole:

- Tempo limite: 10 secondi per caso di test
- Memoria: 1024MB
- Dimensione del codice: 1MB
- Compilazione: 60 secondi

Il manuale e un **JAR** eseguibile di test sono disponibili sul [sito][2].

Si può persino vedere il [codice sorgente][3] del visualizzatore, scritto in java.

Ecco il risultato del mio algoritmo per il caso di test 1:

![Schermata del visualizzatore](/articles/tco-2014-round-2-rectangles-and-holes/visualizer.png)

## Soluzione

- Non ho dedicato molto tempo a scrivere la mia soluzione; sono partito dall'idea di fare un **grande buco** e il **massimo di piccoli buchi** accanto. Per farlo, ho preso i rettangoli e li ho ordinati in base al lato più lungo (girando i rettangoli fin dall'inizio).
- Ho sommato i lati più lunghi per determinare una lunghezza **D** di circa **TOTALE dei lati / COEFFICIENTE**, con COEFFICIENTE preso dalla seguente lista {7, 6.75, 7.25, 6.25, 6.5, 7.5}.
- Poi ho tracciato un quadrato di lato **D**/4 e l'ho trasformato in cerchio stirando ogni lato.
- Infine, con i rettangoli rimanenti, ho usato l'algoritmo **SA** per fare il maggior numero di piccoli buchi.

Punteggio provvisorio del submit: 489 126,27 e finale: **488 719,07**

Ecco i miei punteggi per le prime 10 griglie:

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
