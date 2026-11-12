---
title: "TCO 2014 - Round 1 - SquareRemover"
slug: tco-2014-round-1-square-remover
date: 2014-04-24
description: "Top Coder Open 2014 Round 1: il problema SquareRemover."
image: /articles/tco-2014-round-1-square-remover/visualizer.png
---

_TopCoder TCO 2014 (24-04-2014)_

## Round 1: SquareRemover

Il testo completo del problema proposto quest'anno per il primo round del TCO è disponibile [qui][1].

Breve riassunto del problema, abbiamo:

- Una griglia NxN (8<=N<=16) in cui ogni cella è colorata con uno dei colori (4<=colori<=6)
- Un buffer di zone successive; ogni zona è composta da 4 celle.

Lo scopo del gioco è riunire a gruppi di 4 le celle dello stesso colore, che vengono distrutte e poi sostituite dalla zona successiva del buffer.

Ogni zona di 4 celle distrutta vale **1 punto**.

Bisogna implementare un metodo **playIt** che riceve come parametri un intero **colors**, un array di stringhe **board** e un intero **startSeed**.

- colors: corrisponde al numero di colori possibili per la griglia
- board: rappresenta la griglia nella forma ["0123","2031","0221","3201"]
- startSeed: è l'intero che permette di generare la nuova zona

    ```
    A[0] = startSeed
    A[i] = (A[i-1] * 48271) MOD 2147483647
    ```

Il metodo **playIt** deve restituire 10000 mosse, cioè un array di 30000 interi:

- 3\*i: riga della cella da spostare
- 3\*i+1: colonna della cella da spostare
- 3\*i+2: direzione in cui spostare la cella (0 - up, 1 - right, 2 - down, 3 - left)

Una mossa consiste nello scambiare il colore della cella da spostare con quello della cella situata in quella direzione.

## Punteggio

Su TopCoder, il sistema di punteggio è il seguente:

- il risultato di ogni caso di test della soluzione viene confrontato con il miglior risultato di quel caso di test tra tutti i partecipanti al momento del **submit** della soluzione sul sito.
- il primo del caso di test ottiene 10000 punti e gli altri un punteggio proporzionale
- il punteggio totale è la somma dei punteggi dei casi di test normalizzata rispetto al punteggio del migliore

## Esecuzione

Regole:

- Tempo limite: 30 secondi per caso di test
- Memoria: 1024MB
- Dimensione del codice: 1MB
- Compilazione: 60 secondi

Il manuale e un **JAR** eseguibile di test sono disponibili sul [sito][2].

Si può persino vedere il [codice sorgente][3] del visualizzatore, scritto in java.

![Schermata del visualizzatore](/articles/tco-2014-round-1-square-remover/visualizer.png)

Lo scopo del gioco è riunire i colori a gruppi di 4:

![Esempio di una mossa normale](/articles/tco-2014-round-1-square-remover/move-1.png)

È possibile fare combinazioni con un'unica mossa e così accumulare punti:

![Esempio di una mossa doppia](/articles/tco-2014-round-1-square-remover/move-2.png)

## Soluzione

Non avendo avuto molto tempo e non essendo un esperto (solo 4/5 maratone nell'ultimo anno) rispetto alla maggior parte dei partecipanti, che fanno anche match a tempo di 8 ore tutto l'anno e la maggior parte delle maratone, il mio punteggio finale è lontano dall'essere il migliore, ma l'algoritmo della mia soluzione è quello usato da tutti i punteggi migliori, quindi mi permetto di presentarlo qui un po' più in dettaglio.

Questo algoritmo è il [**Beam Search**][4] ([Algorithme de recherche en faisceau][5] in francese).

Il principio è giocare tutte le mosse di un'iterazione e conservare, tra le soluzioni migliori, un numero di soluzioni chiamato **WIDTH**. Poi, per ciascuna di queste soluzioni, si rigiocano tutte le mosse e si conservano di nuovo le **WIDTH** migliori.

La grande difficoltà nell'applicare l'algoritmo a questo problema è la fattibilità matematica dato il numero di soluzioni possibili: (16 \* 16 \* 4) ^ 10000 -> infinito

È quindi necessario limitare il numero di punti da giocare a ogni iterazione e limitare anche la **WIDTH** dell'algoritmo.

Pseudocodice JAVA:

```java
 private State[] beamSearch(int WIDTH) {
	//init
	root = new State(0);
	State[] current = new State[4*points.length], currentChildren;
	State state;
	int count = 0;
	for (int p = 0; p < betterPoints.length; p++) {
		for (int d = 0; d < 4; d++) {
			if (p2 > -1/**punto valido**/) {
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
					if (p2 > -1/**punto valido**/) {
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

Per scegliere i punti migliori da spostare, ho deciso di prendere i punti più vicini a una zona di 3 celle dello stesso colore e poi, se non ce n'erano, ho considerato a coppie le celle più vicine a una zona di 2 celle dello stesso colore.

Punteggio provvisorio del submit: 446164,62 e finale: **418829,75**

Ecco i miei punteggi per le prime 10 griglie:

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

Il primo ha circa il doppio per ogni punteggio!!!

**Osservazione:** Peccato, i miei punteggi erano migliori, ma avevo un piccolo errore nel codice finale che ha fatto fallire molti casi di test; la prossima volta spero di essere più attento.

[1]: http://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=15938&pm=13132
[2]: http://www.topcoder.com/contest/problem/SquareRemover/manual.html
[3]: http://www.topcoder.com/contest/problem/SquareRemover/SquareRemoverVis.java
[4]: http://en.wikipedia.org/wiki/Beam_search
[5]: http://fr.wikipedia.org/wiki/Algorithme_de_recherche_en_faisceau
