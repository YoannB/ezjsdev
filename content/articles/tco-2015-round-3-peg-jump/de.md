---
title: "TCO 2015 - Runde 3 - PegJump"
slug: tco-2015-runde-3-peg-jump
date: 2015-07-22
description: "Top Coder Open 2015 Runde 3: das Problem PegJump."
image: /articles/tco-2015-round-3-peg-jump/pegjump-seed1-init.png
---

_TopCoder TCO 2015 (22-06-2015)_

## Runde 3: PegJump

> Eine Abwandlung des SOLITÄRSPIELS

Die vollständige Aufgabenstellung des Problems der dritten Runde des TCO 2015 ist [hier][1] verfügbar.

Kurze Zusammenfassung des Problems, wir haben:

- Eine Ebene mit x- und y-Koordinaten zwischen 20 und 60, die die Position der **Pegs** enthält.
- Und eine Liste von Ganzzahlen, die den Werten der **Pegs** entsprechen.

Wie beim Solitär besteht das Ziel des Spiels darin, mit **Pegs** zu springen, um die anderen zu _schlagen_, wobei das Hauptziel ist, _Ketten_ von **Peg**-Sprüngen zu bilden.

Die Formel für die Punktzahl lautet **Anzahl der Peg-Sprünge x Summe der Werte der geschlagenen Pegs**.

Zu implementieren ist eine Methode **getMoves**, die als Parameter ein Ganzzahl-Array **pegValue** und ein String-Array **board** erhält.

- pegValue: die Werte jedes **Peg**-Typs
- board: die Ebene mit den **Pegs** und ihrem Typ

Die Methode **getMoves** muss die Liste der **Peg**-Sprünge zurückgeben, ausgehend von den x- und y-Koordinaten des springenden **Pegs** und der Sprungrichtung Up, Down, Left, Right. Werden Sprünge verkettet, hängt man die Richtungen einfach hintereinander:

- Beispiel für einen einfachen Sprung: "1 5 U"
- Beispiel für einen _großen_ Sprung: "1 5 UDLRUDLLR"

## Punktzahl

Dieses Jahr hat sich die Wertung bei TopCoder geändert und lautet nun:

- das Ergebnis jedes Testfalls der Lösung wird mit den Ergebnissen dieses Testfalls aller Teilnehmer zum Zeitpunkt des **Submits** der Lösung auf der Website verglichen; hat man mehr, erhält man 1 Punkt, bei gleicher Punktzahl 0.5 Punkte, sonst 0 Punkte.
- die Gesamtpunktzahl ist die Summe der Punktzahlen der Testfälle, normiert auf die Anzahl der Teilnehmer

## Ausführung

Regeln:

- Zeitlimit: 15 Sekunden pro Testfall
- Speicher: 1024MB
- Codegröße: 1MB
- Kompilierung: 30 Sekunden

Das Handbuch sowie ein ausführbares Test-**JAR** sind auf der [Website][2] verfügbar.

Man kann sogar den [Quellcode][3] des in Java geschriebenen Visualizers ansehen.

Hier das Ergebnis meines Algorithmus für Testfall 1:

![Beispiel Seed 1 init](/articles/tco-2015-round-3-peg-jump/pegjump-seed1-init.png)

![Beispiel Seed 1 final](/articles/tco-2015-round-3-peg-jump/pegjump-seed1-final.png)

## Lösung

- Sehr weit von den Ergebnissen der Ersten entfernt; ich habe mich nicht genug um Sprungketten eines einzelnen Spielsteins gekümmert...
- Test mehrerer Algorithmen: Tiefensuche DFS (Depth First Search), Beam Search ...
- Aufteilung großer Gitter in 2, 4, 9 oder 16 Teile, um sie schneller zu verarbeiten
- Einsatz einer Beam-Suche, um die Gitter vor der Verarbeitung zu vereinfachen (alle Zellen in 4er-Blöcken durchlaufen und springen, solange 4 Zellen einen _Peg_ enthalten)
- Die beste Sprungsequenz finden und dann versuchen, sie zu verbessern

Vorläufige Submit-Punktzahl: 98 869,77 und endgültig: **110 956,41**

Hier meine Punktzahlen für die ersten 10 Gitter:

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
