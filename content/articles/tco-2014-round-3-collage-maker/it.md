---
title: "TCO 2014 - Round 3 - CollageMaker"
slug: tco-2014-round-3-collage-maker
date: 2014-07-09
description: "Top Coder Open 2014 Round 3: il problema CollageMaker."
image: /articles/tco-2014-round-3-collage-maker/visualizer.png
---

_TopCoder TCO 2014 (09-07-2014)_

## Round 3: CollageMaker

Il testo completo del problema proposto per l'ultimo round del TCO è disponibile [qui][1].

Breve riassunto del problema, abbiamo:

- Una cartella contenente 1000 immagini in scala di grigi
- Per ogni caso di test ci viene data un'immagine obiettivo di lunghezza e larghezza massime di 300 pixel e altre 200 immagini di lunghezza e larghezza massime di 100 pixel.

Lo scopo del gioco è ricostruire l'immagine obiettivo con l'aiuto delle altre 200 immagini.

Il punteggio si ottiene calcolando le differenze di livello di grigio tra ogni pixel.

Bisogna implementare un metodo **compose** che riceve come parametro un array di interi **data**. L'array è composto da 201 immagini descritte così:

- un intero H per l'altezza dell'immagine
- un intero W per la larghezza dell'immagine
- e HxW interi corrispondenti ai pixel dell'immagine (livelli di grigio da 0 a 255)

Le immagini non devono per forza conservare il loro rapporto lunghezza / larghezza.

> **Osservazione:** le immagini non possono essere ruotate né avere una lunghezza o una larghezza maggiori di quelle fornite come parametro.

## Punteggio

Su TopCoder, il sistema di punteggio è il seguente:

- il risultato di ogni caso di test della soluzione viene confrontato con il miglior risultato di quel caso di test tra tutti i partecipanti al momento del **submit** della soluzione sul sito.
- il primo del caso di test ottiene 10000 punti e gli altri un punteggio proporzionale
- il punteggio totale è la somma dei punteggi dei casi di test normalizzata rispetto al punteggio del migliore

## Esecuzione

Regole:

- Tempo limite: 10 secondi per caso di test
- Memoria: 1024MB
- Dimensione del codice: 256KB
- Compilazione: 60 secondi

Il manuale e un **JAR** eseguibile di test sono disponibili sul [sito][2].

Si può persino vedere il [codice sorgente][3] del visualizzatore, scritto in java.

Ecco il risultato del mio algoritmo per il caso di test 1:

![Schermata del visualizzatore](/articles/tco-2014-round-3-collage-maker/visualizer.png)

## Soluzione

- In un primo momento ho scelto di suddividere l'immagine obiettivo prendendo la larghezza / lunghezza minima disponibile tra le 200 immagini fornite e usando un algoritmo **greedy** per posizionarle.
- Poi ho ridotto la dimensione delle zone per ottimizzare il punteggio.
- Per ogni immagine, ho poi provato a estenderla in altezza e in larghezza.
- Poi ordino le immagini per punteggio relativo decrescente e suddivido le immagini con i punteggi più alti in 4 sottoparti (ho scelto la strada estremamente semplice; i punteggi migliori hanno suddiviso o in larghezza o in lunghezza).
- Concludo l'elaborazione con un algoritmo **SA** (simulated annealing) per scambiare le immagini tra loro.

Punteggio provvisorio del submit: 809 648,79 e finale: **807 646,95**

Ecco i miei punteggi per le prime 10 griglie:

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

**Osservazione:** si sarebbe potuto pensare all'analisi d'immagine, ma i punteggi migliori della maratona dimostrano proprio il contrario; ecco una schermata del primo, **[ainu7][ainu7]**:

![ainu7-seed1](/articles/tco-2014-round-3-collage-maker/ainu7.png)

[1]: http://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=16012&pm=13246
[2]: http://community.topcoder.com/contest/problem/CollageMaker/manual.html
[3]: http://www.topcoder.com/contest/problem/CollageMaker/CollageMakerVis.java
[ainu7]: http://community.topcoder.com/tc?module=MemberProfile&cr=22653720
