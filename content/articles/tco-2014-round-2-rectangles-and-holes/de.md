---
title: "TCO 2014 - Runde 2 - RectanglesAndHoles"
slug: tco-2014-runde-2-rectangles-and-holes
date: 2014-06-11
description: "Top Coder Open 2014 Runde 2: das Problem RectanglesAndHoles."
image: /articles/tco-2014-round-2-rectangles-and-holes/visualizer.png
---

_TopCoder TCO 2014 (11-06-2014)_

## Runde 2: RectanglesAndHoles

Die vollständige Aufgabenstellung des Problems der zweiten TCO-Runde ist [hier][1] verfügbar.

Kurze Zusammenfassung des Problems, wir haben:

- Eine Ebene mit x- und y-Koordinaten zwischen -1000000 und 1000000
- Und zwei Listen von Ganzzahlen zwischen 100 und 1000, die den 2 Seiten eines Rechtecks entsprechen.

Ziel des Spiels ist es, mit den Rechtecken „Löcher“ zu bilden.

Die Formel für die Punktzahl lautet **Anzahl der Löcher x Anzahl der Löcher x Summe der Fläche der Löcher**.

Zu implementieren ist eine Methode **place**, die als Parameter die beiden Ganzzahl-Arrays **A** und **B** erhält.

- A: die Längen der ersten Seite jedes Rechtecks
- B: die Längen der zweiten Seite jedes Rechtecks

Im Folgenden betrachte ich dieses Rechteck mit seinen 4 Eckpunkten (a,b,c,d):

```
a__b
|  |
|__|
c  d
```

Die Methode **place** muss die Position jedes Rechtecks zurückgeben, also seine x- und y-Koordinaten für den Eckpunkt **c** und die Ausrichtung des Rechtecks in Bezug auf die als Parameter übergebenen Seiten:

- 3\*i: x-Koordinate
- 3\*i+1: y-Koordinate
- 3\*i+2: 0 oder 1, je nachdem, ob die Ausrichtung des Rechtecks umgekehrt werden soll

> **Anmerkung:** Mit der Ausrichtung lassen sich Länge und Breite jedes Rechtecks steuern.

## Punktzahl

Bei TopCoder funktioniert die Wertung wie folgt:

- das Ergebnis jedes Testfalls der Lösung wird mit dem besten Ergebnis dieses Testfalls unter allen Teilnehmern zum Zeitpunkt des **Submits** der Lösung auf der Website verglichen.
- der Erste eines Testfalls erhält 10000 Punkte, die anderen eine proportionale Punktzahl
- die Gesamtpunktzahl ist die Summe der Punktzahlen der Testfälle, normiert auf die Punktzahl des Besten

## Ausführung

Regeln:

- Zeitlimit: 10 Sekunden pro Testfall
- Speicher: 1024MB
- Codegröße: 1MB
- Kompilierung: 60 Sekunden

Das Handbuch sowie ein ausführbares Test-**JAR** sind auf der [Website][2] verfügbar.

Man kann sogar den [Quellcode][3] des in Java geschriebenen Visualizers ansehen.

Hier das Ergebnis meines Algorithmus für Testfall 1:

![Screenshot des Visualizers](/articles/tco-2014-round-2-rectangles-and-holes/visualizer.png)

## Lösung

- Ich habe mir nicht viel Zeit für meine Lösung genommen und bin von der Idee ausgegangen, ein **großes Loch** und daneben **möglichst viele kleine Löcher** zu bilden. Dazu habe ich die Rechtecke nach ihrer längsten Seite sortiert (wobei ich die Rechtecke von Anfang an gedreht habe).
- Ich habe die längsten Seiten aufsummiert, um eine Länge **D** von etwa **SUMME der Seiten / KOEFFIZIENT** zu bestimmen, wobei KOEFFIZIENT aus der folgenden Liste stammt {7, 6.75, 7.25, 6.25, 6.5, 7.5}.
- Danach habe ich ein Quadrat mit der Seitenlänge **D**/4 gezeichnet und es durch Strecken jeder Seite in einen Kreis verwandelt.
- Zum Schluss habe ich mit den verbleibenden Rechtecken den **SA**-Algorithmus verwendet, um möglichst viele kleine Löcher zu bilden.

Vorläufige Submit-Punktzahl: 489 126,27 und endgültig: **488 719,07**

Hier meine Punktzahlen für die ersten 10 Gitter:

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
