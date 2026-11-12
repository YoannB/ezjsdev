---
title: "TCO 2015 - Round 3 - PegJump"
slug: tco-2015-round-3-peg-jump
date: 2015-07-22
description: "Top Coder Open 2015 Round 3: il problema PegJump."
image: /articles/tco-2015-round-3-peg-jump/pegjump-seed1-init.png
---

_TopCoder TCO 2015 (22-06-2015)_

## Round 3: PegJump

> Una variante del SOLITARIO

Il testo completo del problema proposto per il terzo round del TCO 2015 è disponibile [qui][1].

Breve riassunto del problema, abbiamo:

- Un piano con coordinate x e y comprese tra 20 e 60, che contiene la posizione dei **peg**.
- E una lista di interi corrispondenti ai valori dei **peg**.

Come nel solitario, lo scopo del gioco è fare salti di **peg** per _mangiare_ gli altri, ma con l'obiettivo principale di fare _catene_ di salti di **peg**.

La formula di calcolo del punteggio è **numero di salti di peg x somma dei valori dei peg mangiati**.

Bisogna implementare un metodo **getMoves** che riceve come parametri un array di interi **pegValue** e un array di stringhe **board**.

- pegValue: corrisponde ai valori di ogni tipo di **peg**
- board: corrisponde al piano e contiene i **peg** con il loro tipo

Il metodo **getMoves** deve restituire la lista dei salti di **peg**, partendo dalle coordinate x e y del **peg** che deve saltare e dalla direzione del salto Up, Down, Left, Right. Quando si concatenano i salti, basta accodare le direzioni una dopo l'altra:

- esempio di un salto semplice: "1 5 U"
- esempio di un _grande_ salto: "1 5 UDLRUDLLR"

## Punteggio

Quest'anno su TopCoder il sistema di punteggio è cambiato ed è ora il seguente:

- il risultato di ogni caso di test della soluzione viene confrontato con i risultati di quel caso di test di tutti i partecipanti al momento del **submit** della soluzione sul sito; se si ha di più si guadagna 1 punto, se i punteggi sono identici 0.5 punti, altrimenti 0 punti.
- il punteggio totale è la somma dei punteggi dei casi di test normalizzata rispetto al numero di candidati

## Esecuzione

Regole:

- Tempo limite: 15 secondi per caso di test
- Memoria: 1024MB
- Dimensione del codice: 1MB
- Compilazione: 30 secondi

Il manuale e un **JAR** eseguibile di test sono disponibili sul [sito][2].

Si può persino vedere il [codice sorgente][3] del visualizzatore, scritto in java.

Ecco il risultato del mio algoritmo per il caso di test 1:

![Esempio seed 1 init](/articles/tco-2015-round-3-peg-jump/pegjump-seed1-init.png)

![Esempio seed 1 final](/articles/tco-2015-round-3-peg-jump/pegjump-seed1-final.png)

## Soluzione

- Molto lontano dai punteggi dei primi, non mi sono preoccupato abbastanza dei salti concatenati da una sola pedina...
- Test di diversi algoritmi: la ricerca in profondità DFS (Depth First Search), Beam Search ...
- Suddivisione delle griglie grandi in 2, 4, 9 o 16 parti per elaborarle più rapidamente
- Uso di un Beam per semplificare le griglie prima di elaborarle (scorrere tutte le celle 4 per 4 e fare salti finché ci sono 4 celle con un _peg_)
- Trovare la migliore sequenza di salti e poi provare a migliorarla

Punteggio provvisorio del submit: 98 869,77 e finale: **110 956,41**

Ecco i miei punteggi per le prime 10 griglie:

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
