---
title: "TCO 2015 - Runde 2 - PathDefense"
slug: tco-2015-runde-2-path-defense
date: 2015-07-20
description: "Top Coder Open 2015 Runde 2: das Problem PathDefense."
image: /articles/tco-2015-round-2-path-defense/pathdefense-seed1-init.png
---

_TopCoder TCO 2015 (25-05-2015)_

## Runde 2: PathDefense

Die vollständige Aufgabenstellung des Problems der zweiten Runde des TCO 2015 ist [hier][1] verfügbar.

Kurze Zusammenfassung des Problems, wir haben:

- Eine Ebene mit x- und y-Koordinaten zwischen 20 und 60 (Grenzen eingeschlossen) mit Basen und Wegen, die zu den Basen führen
- Das zu Beginn verfügbare Geld _money_ (initialisiert mit der Summe der verschiedenen Werte der _towers_)
- Die Lebenspunkte der _Viecher_, gegeben durch _creepHealth_, geben die Startlebenspunkte jedes Viechs an; bei jeder 500. Iteration (500,1000,1500) verdoppeln sich die Lebenspunkte der Viecher.
- Der Geldbetrag _creepMoney_, den man nach dem Töten eines Viechs erhält
- Die Anzahl der verfügbaren Typen von Verteidigungstürmen _towerType_, um die Viecher zu töten
- Die Viecher _creep_ mit ihrer Position und ihren verbleibenden Lebenspunkten
- die Lebenspunkte jeder Basis _baseHealth_

Ziel des Spiels ist es, mit **towers** die **Basen** zu verteidigen, die jeweils mit 1000 Lebenspunkten starten und von den Viechern **creep** angegriffen werden, und das Geld in der Kasse am Ende zu maximieren.

Die Punktzahl ergibt sich aus dem Geld **money** (Summe der verbleibenden Lebenspunkte jeder Basis und des Geldes in der Kasse).

Zu implementieren ist eine Methode **init**, die als Parameter die Ebene _board_, die Ganzzahl _money_, die Ganzzahl _creepHealth_, die Ganzzahl _creepMoney_ und die Ganzzahl _towerType_ erhält.

- board: die Koordinatenebene
- money: das Startgeld
- creepHealth: die Startlebenspunkte der Viecher
- creepMoney: das Geld, das man nach dem Töten eines Viechs erhält
- towerType: die verfügbaren Typen von Verteidigungstürmen

Und eine Methode **placeTowers**, die vom Visualizer _2000-mal_ aufgerufen wird und als Parameter das Array der _creep_, den aktuellen Kassenstand _money_ und die verbleibenden Lebenspunkte jeder Basis _baseHealth_ erhält.

- creep: die Koordinaten der Viecher in der Ebene
- money: das Geld, das sich aktuell in der Kasse befindet
- baseHealth: die aktuellen Lebenspunkte der Basen

> **Anmerkung:** Die _creep_ bewegen sich nur entlang der Wege, die zu den Basen führen (jede Basis kann 0 bis n Wege haben, die zu ihr führen).

> Die _towers_ haben einen Angriffsradius, eine Stärke und Kosten. Der Angriffsradius **range** ist so definiert: Steht der Turm bei (X1,Y1) und ist sein _range_ R, dann wird das Viech bei (X2,Y2) genau dann angegriffen, wenn `(X1-X2)*(X1-X2)+(Y1-Y2)*(Y1-Y2)<=R*R`.

## Punktzahl

Dieses Jahr hat sich die Wertung bei TopCoder geändert und lautet nun:

- das Ergebnis jedes Testfalls der Lösung wird mit den Ergebnissen dieses Testfalls aller Teilnehmer zum Zeitpunkt des **Submits** der Lösung auf der Website verglichen; hat man mehr, erhält man 1 Punkt, bei gleicher Punktzahl 0.5 Punkte, sonst 0 Punkte.
- die Gesamtpunktzahl ist die Summe der Punktzahlen der Testfälle, normiert auf die Anzahl der Teilnehmer und multipliziert mit 100000.

## Ausführung

Regeln:

- Zeitlimit: 20 Sekunden pro Testfall
- Speicher: 1024MB
- Codegröße: 1MB
- Kompilierung: 60 Sekunden

Das Handbuch sowie ein ausführbares Test-**JAR** sind auf der [Website][2] verfügbar.

Man kann sogar den [Quellcode][3] des in Java geschriebenen Visualizers ansehen.

Hier das Ergebnis meines Algorithmus für Testfall 1:

![Seed 1 init](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-init.png)

![Seed 1 first tower](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-firsttower.png)

![Seed 1 final](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-final.png)

Und für Testfall 2:

![Seed 2 init](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-init.png)

![Seed 2 first tower](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-firsttower.png)

![Seed 2 final](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-final.png)

## Lösung

- ich habe einfach den A-Star-Algorithmus verwendet, um die Bewegung der Viecher auf der Ebene zu simulieren
- dazu eine Formel, die alle Parameter berücksichtigt, um die Anzahl der zu kaufenden Türme zu bestimmen
- Greedy-Platzierung der Türme nach ihrer Schlagkraft
- viele kleine Code-Optimierungen für die verschiedenen Testfälle

Vorläufige Submit-Punktzahl: 597 041,42 und endgültig: **564 610,95**

Hier meine Punktzahlen für die ersten 10 Gitter:

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
