---
title: "TCO 2015 - Runde 1 - SmallPolygons"
slug: tco-2015-runde-1-small-polygons
date: 2015-06-20
description: "Top Coder Open 2015 Runde 1: das Problem SmallPolygons."
image: /articles/tco-2015-round-1-small-polygons/seed-5-np-1368-n-6-polygonization-180sec.png
---

_TopCoder TCO 2015 (20-04-2015)_

## Runde 1: SmallPolygons

Die vollständige Aufgabenstellung des Problems der ersten Runde des TCO 2015 ist [hier][1] verfügbar.

Kurze Zusammenfassung des Problems, wir haben:

- Eine Ebene mit x- und y-Koordinaten zwischen 0 und 699
- Eine Liste von Punkten in der Ebene.
- Und eine maximale Anzahl zu bildender Polygone

Ziel des Spiels ist es, mit den Punkten Polygone zu bilden, ohne die vorgegebene Anzahl an Polygonen zu überschreiten, und dabei die Fläche der so entstandenen Polygone zu minimieren.

Die Formel für die Punktzahl lautet **Summe der Flächen der Polygone**.

Zu implementieren ist eine Methode **choosePolygons**, die als Parameter das Ganzzahl-Array **points** und eine Ganzzahl **N** erhält.

- points: die Liste der Punkte
- N: die maximale Anzahl an Polygonen

Die Methode **choosePolygons** muss jedes Polygon zurückgeben, als Array der Indizes der Punkte, die ein Polygon bilden sollen.

> die Reihenfolge der Punkte in der Liste muss erhalten bleiben, damit jeder Punkt später identifiziert werden kann

## Punktzahl

Dieses Jahr hat sich die Wertung bei TopCoder geändert und lautet nun:

- das Ergebnis jedes Testfalls der Lösung wird mit den Ergebnissen dieses Testfalls aller Teilnehmer zum Zeitpunkt des **Submits** der Lösung auf der Website verglichen; hat man mehr, erhält man 1 Punkt, bei gleicher Punktzahl 0.5 Punkte, sonst 0 Punkte.
- die Gesamtpunktzahl ist die Summe der Punktzahlen der Testfälle, normiert auf die Anzahl der Teilnehmer

## Ausführung

Regeln:

- Zeitlimit: 10 Sekunden pro Testfall
- Speicher: 1024MB
- Codegröße: 1MB
- Kompilierung: 30 Sekunden

Das Handbuch sowie ein ausführbares Test-**JAR** sind auf der [Website][2] verfügbar.

Man kann sogar den [Quellcode][3] des in Java geschriebenen Visualizers ansehen.

Hier das Ergebnis meines Algorithmus für einige Testfälle:

![Screenshot Seed 1](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed1.png)

![Screenshot Seed 2](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed2.png)

![Screenshot Seed 5](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed5-saone.png)

## Lösung

> Eine Sache habe ich übersehen: die „Polygonization“, den Algorithmus, mit dem sich „schnell“ ein einfaches Polygon bilden ließ (stattdessen habe ich die Punkte polar sortiert -> das ergibt einen Stern, der sich danach schwerer optimieren und zerlegen lässt...)

![Screenshot Seed 5 sortclockwise](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed5-sortclockwise.png)

> **Polygonization**:
>
> 1. Berechnung des Dreiecks mit der kleinsten Fläche aus der Liste der Punkte (das sind die ersten 3 geordneten Punkte)
> 2. für jede „Kante“ (Seite des Polygons zwischen den Punkten i und i + 1) Berechnung des Kantenmittelpunkts; unter allen verbleibenden Punkten behält man den, der einer Kante am nächsten liegt
> 3. Einfügen des Punktes zwischen die 2 Punkte der Polygonkante
> 4. 2 und 3 wiederholen, bis alle Punkte verwendet sind

Seed 5 mit **Polygonization**:

![Screenshot Seed 5 Polygonization](/articles/tco-2015-round-1-small-polygons/seed-5-np-1368-n-6-polygonization-180sec.png)

Und meine Lösung:

- polare Sortierung der Punkte, um gültige Polygone zu erhalten (eine Minimallösung)

    ![Screenshot Seed 3 sortClockWise](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3-sortclockwise.png)

- Einsatz des K-Means-Algorithmus, um die Punkte auf N Punktlisten aufzuteilen, danach Neuordnung der Punkte mit der polaren Sortierung

    ![Screenshot Seed 3 k-means](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3-kmeans.png)

- Optimierung der Polygone mit einem SA-Algorithmus (durch Tauschen von Punkten zwischen den Polygonen)

    ![Screenshot Seed 3](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3.png)

> für _kleine_ Gitter Einsatz eines Beam-Search-Algorithmus, um _die_ beste Lösung zu finden...

Vorläufige Submit-Punktzahl: 69,40 und endgültig: **1 382,88**

Beste TCO-Platzierung: [46.][4] und Quellcode der Lösung [hier][5].

Hier meine Punktzahlen für die ersten 10 Gitter:

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
