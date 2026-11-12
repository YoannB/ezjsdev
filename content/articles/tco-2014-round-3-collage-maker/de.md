---
title: "TCO 2014 - Runde 3 - CollageMaker"
slug: tco-2014-runde-3-collage-maker
date: 2014-07-09
description: "Top Coder Open 2014 Runde 3: das Problem CollageMaker."
image: /articles/tco-2014-round-3-collage-maker/visualizer.png
---

_TopCoder TCO 2014 (09-07-2014)_

## Runde 3: CollageMaker

Die vollständige Aufgabenstellung des Problems der letzten TCO-Runde ist [hier][1] verfügbar.

Kurze Zusammenfassung des Problems, wir haben:

- Ein Verzeichnis mit 1000 Graustufenbildern
- Für jeden Testfall erhalten wir ein Zielbild mit maximal 300 Pixeln Länge und Breite sowie 200 weitere Bilder mit maximal 100 Pixeln Länge und Breite.

Ziel des Spiels ist es, das Zielbild mithilfe der 200 anderen Bilder nachzubilden.

Die Punktzahl ergibt sich aus der Berechnung der Graustufendifferenzen zwischen den einzelnen Pixeln.

Zu implementieren ist eine Methode **compose**, die als Parameter ein Ganzzahl-Array **data** erhält. Das Array besteht aus 201 Bildern, die so beschrieben werden:

- eine Ganzzahl H für die Höhe des Bildes
- eine Ganzzahl W für die Breite des Bildes
- und HxW Ganzzahlen für die Pixel des Bildes (Graustufen von 0 bis 255)

Die Bilder müssen ihr Seitenverhältnis Länge / Breite nicht beibehalten.

> **Anmerkung:** Die Bilder dürfen weder gedreht werden noch eine größere Länge oder größere Breite haben als die als Parameter übergebenen.

## Punktzahl

Bei TopCoder funktioniert die Wertung wie folgt:

- das Ergebnis jedes Testfalls der Lösung wird mit dem besten Ergebnis dieses Testfalls unter allen Teilnehmern zum Zeitpunkt des **Submits** der Lösung auf der Website verglichen.
- der Erste eines Testfalls erhält 10000 Punkte, die anderen eine proportionale Punktzahl
- die Gesamtpunktzahl ist die Summe der Punktzahlen der Testfälle, normiert auf die Punktzahl des Besten

## Ausführung

Regeln:

- Zeitlimit: 10 Sekunden pro Testfall
- Speicher: 1024MB
- Codegröße: 256KB
- Kompilierung: 60 Sekunden

Das Handbuch sowie ein ausführbares Test-**JAR** sind auf der [Website][2] verfügbar.

Man kann sogar den [Quellcode][3] des in Java geschriebenen Visualizers ansehen.

Hier das Ergebnis meines Algorithmus für Testfall 1:

![Screenshot des Visualizers](/articles/tco-2014-round-3-collage-maker/visualizer.png)

## Lösung

- Zunächst habe ich das Zielbild zerlegt, indem ich die minimale verfügbare Breite / Länge der 200 gelieferten Bilder genommen und sie mit einem **Greedy**-Algorithmus positioniert habe.
- Danach habe ich die Größe der Zonen verringert, um die Punktzahl zu optimieren.
- Anschließend habe ich versucht, jedes Bild in Höhe und Breite zu erweitern.
- Dann sortiere ich die Bilder nach absteigender relativer Punktzahl und zerlege die Bilder mit den höchsten Punktzahlen in 4 Teilbereiche (ich habe es extrem einfach gehalten; die besten Ergebnisse haben entweder in der Breite oder in der Länge geteilt).
- Zum Abschluss tausche ich die Bilder mit einem **SA**-Algorithmus (Simulated Annealing) untereinander.

Vorläufige Submit-Punktzahl: 809 648,79 und endgültig: **807 646,95**

Hier meine Punktzahlen für die ersten 10 Gitter:

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

**Anmerkung:** Man hätte an Bildanalyse denken können, aber die besten Ergebnisse des Marathons beweisen das Gegenteil; hier ein Screenshot des Ersten, **[ainu7][ainu7]**:

![ainu7-seed1](/articles/tco-2014-round-3-collage-maker/ainu7.png)

[1]: http://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=16012&pm=13246
[2]: http://community.topcoder.com/contest/problem/CollageMaker/manual.html
[3]: http://www.topcoder.com/contest/problem/CollageMaker/CollageMakerVis.java
[ainu7]: http://community.topcoder.com/tc?module=MemberProfile&cr=22653720
