---
title: "TCO 2014 - Runde 1 - SquareRemover"
slug: tco-2014-runde-1-square-remover
date: 2014-04-24
description: "Top Coder Open 2014 Runde 1: das Problem SquareRemover."
image: /articles/tco-2014-round-1-square-remover/visualizer.png
---

_TopCoder TCO 2014 (24-04-2014)_

## Runde 1: SquareRemover

Die vollständige Aufgabenstellung des diesjährigen Problems der ersten TCO-Runde ist [hier][1] verfügbar.

Kurze Zusammenfassung des Problems, wir haben:

- Ein NxN-Gitter (8<=N<=16), in dem jede Zelle mit einer der Farben eingefärbt ist (4<=Farben<=6)
- Einen Puffer mit den nächsten Zonen; jede Zone besteht aus 4 Zellen.

Ziel des Spiels ist es, Zellen gleicher Farbe zu Vierergruppen zusammenzubringen, die zerstört und dann durch die nächste Zone aus dem Puffer ersetzt werden.

Jede zerstörte Zone aus 4 Zellen bringt **1 Punkt**.

Zu implementieren ist eine Methode **playIt**, die als Parameter eine Ganzzahl **colors**, ein String-Array **board** und eine Ganzzahl **startSeed** erhält.

- colors: die Anzahl der möglichen Farben des Gitters
- board: stellt das Gitter in der Form ["0123","2031","0221","3201"] dar
- startSeed: die Ganzzahl, mit der die neue Zone erzeugt wird

    ```
    A[0] = startSeed
    A[i] = (A[i-1] * 48271) MOD 2147483647
    ```

Die Methode **playIt** muss 10000 Züge zurückgeben, also ein Array aus 30000 Ganzzahlen:

- 3\*i: Zeile der zu bewegenden Zelle
- 3\*i+1: Spalte der zu bewegenden Zelle
- 3\*i+2: Richtung, in die die Zelle bewegt wird (0 - up, 1 - right, 2 - down, 3 - left)

Ein Zug bedeutet, die Farbe der zu bewegenden Zelle mit der Zelle in dieser Richtung zu tauschen.

## Punktzahl

Bei TopCoder funktioniert die Wertung wie folgt:

- das Ergebnis jedes Testfalls der Lösung wird mit dem besten Ergebnis dieses Testfalls unter allen Teilnehmern zum Zeitpunkt des **Submits** der Lösung auf der Website verglichen.
- der Erste eines Testfalls erhält 10000 Punkte, die anderen eine proportionale Punktzahl
- die Gesamtpunktzahl ist die Summe der Punktzahlen der Testfälle, normiert auf die Punktzahl des Besten

## Ausführung

Regeln:

- Zeitlimit: 30 Sekunden pro Testfall
- Speicher: 1024MB
- Codegröße: 1MB
- Kompilierung: 60 Sekunden

Das Handbuch sowie ein ausführbares Test-**JAR** sind auf der [Website][2] verfügbar.

Man kann sogar den [Quellcode][3] des in Java geschriebenen Visualizers ansehen.

![Screenshot des Visualizers](/articles/tco-2014-round-1-square-remover/visualizer.png)

Ziel des Spiels ist es, die Farben zu Vierergruppen zusammenzubringen:

![Beispiel für einen normalen Zug](/articles/tco-2014-round-1-square-remover/move-1.png)

Mit einem einzigen Zug lassen sich Kombinationen bilden und so Punkte sammeln:

![Beispiel für einen Doppelzug](/articles/tco-2014-round-1-square-remover/move-2.png)

## Lösung

Da ich nicht viel Zeit hatte und kein Experte bin (nur 4/5 Marathons im letzten Jahr), im Vergleich zu den meisten Teilnehmern, die das ganze Jahr über auch 8-Stunden-Matches auf Zeit und die meisten Marathons bestreiten, ist meine Endpunktzahl bei Weitem nicht die beste. Der Algorithmus meiner Lösung ist jedoch derjenige, den alle Topergebnisse verwendet haben, daher erlaube ich mir, ihn hier etwas ausführlicher vorzustellen.

Dieser Algorithmus ist die [**Beam Search**][4] (auf Französisch [Algorithme de recherche en faisceau][5]).

Das Prinzip: Man spielt alle Züge einer Iteration und behält unter den besten Lösungen eine Anzahl von Lösungen, die **WIDTH** genannt wird. Danach spielt man für jede dieser Lösungen erneut alle Züge und behält wieder die **WIDTH** besten.

Die große Schwierigkeit bei der Anwendung des Algorithmus auf dieses Problem ist die mathematische Machbarkeit angesichts der Anzahl möglicher Lösungen: (16 \* 16 \* 4) ^ 10000 -> unendlich

Daher muss die Anzahl der pro Iteration zu spielenden Punkte begrenzt werden, ebenso die **WIDTH** des Algorithmus.

JAVA-Pseudocode:

```java
 private State[] beamSearch(int WIDTH) {
	//init
	root = new State(0);
	State[] current = new State[4*points.length], currentChildren;
	State state;
	int count = 0;
	for (int p = 0; p < betterPoints.length; p++) {
		for (int d = 0; d < 4; d++) {
			if (p2 > -1/**gültiger Punkt**/) {
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
					if (p2 > -1/**gültiger Punkt**/) {
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

Für die Auswahl der besten zu bewegenden Punkte habe ich die Punkte genommen, die einer Zone aus 3 gleichfarbigen Zellen am nächsten liegen, und, falls es keine gab, paarweise die Zellen betrachtet, die einer Zone aus 2 gleichfarbigen Zellen am nächsten liegen.

Vorläufige Submit-Punktzahl: 446164,62 und endgültig: **418829,75**

Hier meine Punktzahlen für die ersten 10 Gitter:

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

Der Erste hat bei jeder Punktzahl ungefähr das Doppelte!!!

**Anmerkung:** Schade, meine Punktzahlen waren besser, aber ich hatte einen kleinen Fehler in meinem finalen Code, durch den viele Testfälle fehlgeschlagen sind; nächstes Mal bin ich hoffentlich aufmerksamer.

[1]: http://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=15938&pm=13132
[2]: http://www.topcoder.com/contest/problem/SquareRemover/manual.html
[3]: http://www.topcoder.com/contest/problem/SquareRemover/SquareRemoverVis.java
[4]: http://en.wikipedia.org/wiki/Beam_search
[5]: http://fr.wikipedia.org/wiki/Algorithme_de_recherche_en_faisceau
