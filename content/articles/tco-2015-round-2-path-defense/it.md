---
title: "TCO 2015 - Round 2 - PathDefense"
slug: tco-2015-round-2-path-defense
date: 2015-07-20
description: "Top Coder Open 2015 Round 2: il problema PathDefense."
image: /articles/tco-2015-round-2-path-defense/pathdefense-seed1-init.png
---

_TopCoder TCO 2015 (25-05-2015)_

## Round 2: PathDefense

Il testo completo del problema proposto per il secondo round del TCO 2015 è disponibile [qui][1].

Breve riassunto del problema, abbiamo:

- Un piano con coordinate x e y comprese tra 20 e 60 (estremi inclusi) con delle basi e dei percorsi che portano alle basi
- Il denaro disponibile alla partenza _money_ (inizializzato con la somma dei diversi valori delle _towers_)
- La vita delle _bestiole_, data da _creepHealth_, indica la vita iniziale di ogni bestiola; ogni 500 iterazioni (500,1000,1500) la vita delle bestiole raddoppia.
- La somma di denaro _creepMoney_ che si guadagna dopo aver ucciso una bestiola
- Il numero di tipi di torri di difesa disponibili _towerType_ per uccidere le bestiole
- Le bestiole _creep_ con la loro posizione e la vita rimanente
- la vita di ciascuna delle basi _baseHealth_

Lo scopo del gioco è difendere con delle **towers** le **basi**, che partono ciascuna con 1000 punti vita e vengono attaccate dalle bestiole **creep**, e massimizzare il denaro finale in cassa.

Il punteggio è dato dal denaro **money** (somma della vita rimanente di ogni base e del denaro in cassa).

Bisogna implementare un metodo **init** che riceve come parametri il piano _board_, l'intero _money_, l'intero _creepHealth_, l'intero _creepMoney_ e l'intero _towerType_.

- board: corrisponde al piano delle coordinate
- money: corrisponde al denaro iniziale
- creepHealth: corrisponde alla vita iniziale delle bestiole
- creepMoney: corrisponde al denaro guadagnato dopo aver ucciso una bestiola
- towerType: corrisponde ai tipi di torri di difesa disponibili

E un metodo **placeTowers** che verrà chiamato _2000 volte_ dal visualizzatore e che riceve come parametri l'array dei _creep_, il valore attuale della cassa _money_ e la vita rimanente di ogni base _baseHealth_.

- creep: corrisponde alle coordinate delle bestiole nel piano
- money: corrisponde al denaro attualmente in cassa
- baseHealth: corrisponde alla vita attuale delle basi

> **Osservazione:** i _creep_ si spostano solo lungo i percorsi che portano alle basi (ogni base può avere da 0 a n percorsi che portano a essa).

> Le _towers_ hanno un raggio d'attacco, una forza e un costo. Il raggio d'attacco **range** è definito così: se la torre è in (X1,Y1) e il suo _range_ è R, la bestiola in (X2,Y2) verrà attaccata se e solo se `(X1-X2)*(X1-X2)+(Y1-Y2)*(Y1-Y2)<=R*R`.

## Punteggio

Quest'anno su TopCoder il sistema di punteggio è cambiato ed è ora il seguente:

- il risultato di ogni caso di test della soluzione viene confrontato con i risultati di quel caso di test di tutti i partecipanti al momento del **submit** della soluzione sul sito; se si ha di più si guadagna 1 punto, se i punteggi sono identici 0.5 punti, altrimenti 0 punti.
- il punteggio totale è la somma dei punteggi dei casi di test normalizzata rispetto al numero di candidati e moltiplicata per 100000.

## Esecuzione

Regole:

- Tempo limite: 20 secondi per caso di test
- Memoria: 1024MB
- Dimensione del codice: 1MB
- Compilazione: 60 secondi

Il manuale e un **JAR** eseguibile di test sono disponibili sul [sito][2].

Si può persino vedere il [codice sorgente][3] del visualizzatore, scritto in java.

Ecco il risultato del mio algoritmo per il caso di test 1:

![Seed 1 init](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-init.png)

![Seed 1 first tower](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-firsttower.png)

![Seed 1 final](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-final.png)

E per il caso di test 2:

![Seed 2 init](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-init.png)

![Seed 2 first tower](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-firsttower.png)

![Seed 2 final](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-final.png)

## Soluzione

- ho semplicemente usato l'algoritmo A-star per simulare lo spostamento delle bestiole nel piano
- e una formula che tiene conto di tutti i parametri per determinare il numero di torri da acquistare
- posizionamento greedy delle torri in base alla loro potenza di fuoco
- numerose piccole ottimizzazioni del codice per i diversi casi di test

Punteggio provvisorio del submit: 597 041,42 e finale: **564 610,95**

Ecco i miei punteggi per le prime 10 griglie:

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
