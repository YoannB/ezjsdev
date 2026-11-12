---
title: "TCO 2015 - Round 1 - SmallPolygons"
slug: tco-2015-round-1-small-polygons
date: 2015-06-20
description: "Top Coder Open 2015 Round 1: il problema SmallPolygons."
image: /articles/tco-2015-round-1-small-polygons/seed-5-np-1368-n-6-polygonization-180sec.png
---

_TopCoder TCO 2015 (20-04-2015)_

## Round 1: SmallPolygons

Il testo completo del problema proposto per il primo round del TCO 2015 è disponibile [qui][1].

Breve riassunto del problema, abbiamo:

- Un piano con coordinate x e y comprese tra 0 e 699
- Una lista di punti nel piano.
- E un numero massimo di poligoni da costruire

Lo scopo del gioco è formare dei poligoni con i punti senza superare il numero di poligoni dato e minimizzando l'area dei poligoni così creati.

La formula di calcolo del punteggio è **somma delle aree dei poligoni**.

Bisogna implementare un metodo **choosePolygons** che riceve come parametri l'array di interi **points** e un intero **N**.

- points: corrisponde alla lista dei punti
- N: corrisponde al massimo di poligoni

Il metodo **choosePolygons** deve restituire ogni poligono, sotto forma di array degli indici dei punti che devono formare un poligono.

> l'ordine dei punti della lista deve essere conservato per poter identificare ogni punto in seguito

## Punteggio

Quest'anno su TopCoder il sistema di punteggio è cambiato ed è ora il seguente:

- il risultato di ogni caso di test della soluzione viene confrontato con i risultati di quel caso di test di tutti i partecipanti al momento del **submit** della soluzione sul sito; se si ha di più si guadagna 1 punto, se i punteggi sono identici 0.5 punti, altrimenti 0 punti.
- il punteggio totale è la somma dei punteggi dei casi di test normalizzata rispetto al numero di candidati

## Esecuzione

Regole:

- Tempo limite: 10 secondi per caso di test
- Memoria: 1024MB
- Dimensione del codice: 1MB
- Compilazione: 30 secondi

Il manuale e un **JAR** eseguibile di test sono disponibili sul [sito][2].

Si può persino vedere il [codice sorgente][3] del visualizzatore, scritto in java.

Ecco il risultato del mio algoritmo per alcuni casi di test:

![Schermata seed 1](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed1.png)

![Schermata seed 2](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed2.png)

![Schermata seed 5](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed5-saone.png)

## Soluzione

> Mi è sfuggita una cosa, la "polygonization", l'algoritmo che permetteva di costruire un poligono semplice "rapidamente" (al suo posto ho usato un ordinamento polare dei punti -> il che dà una stella più difficile da ottimizzare e da suddividere in seguito...)

![Schermata seed 5 sortclockwise](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed5-sortclockwise.png)

> **polygonization**:
>
> 1. calcolo del triangolo di area minima nella lista di punti (sono i primi 3 punti ordinati)
> 2. per ogni "vertice" (lato del poligono formato dai punti i e i + 1), calcolo del punto medio del vertice e, tra tutti i punti rimanenti, si tiene il più vicino a un vertice
> 3. aggiunta del punto tra i 2 punti del vertice del poligono
> 4. ripetere 2 e 3 finché tutti i punti sono stati usati

Seed 5 con **polygonization**:

![Schermata seed 5 polygonization](/articles/tco-2015-round-1-small-polygons/seed-5-np-1368-n-6-polygonization-180sec.png)

E la mia soluzione:

- ordinamento polare dei punti per ottenere poligoni validi (ottenimento di una soluzione minima)

    ![Schermata seed 3 sortClockWise](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3-sortclockwise.png)

- uso dell'algoritmo K-Means per suddividere i punti in N liste di punti, poi riordinamento dei punti con l'ordinamento polare

    ![Schermata seed 3 k-means](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3-kmeans.png)

- ottimizzazione dei poligoni con un algoritmo SA (scambiando punti tra i poligoni)

    ![Schermata seed 3](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3.png)

> per le griglie _piccole_, uso di un algoritmo Beam Search per trovare _la_ soluzione migliore...

Punteggio provvisorio del submit: 69,40 e finale: **1 382,88**

Miglior piazzamento al TCO: [46°][4] e codice sorgente della soluzione [qui][5].

Ecco i miei punteggi per le prime 10 griglie:

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
