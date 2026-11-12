---
title: "TCO 2015 - Round 2 - PathDefense"
slug: tco-2015-round-2-path-defense
date: 2015-07-20
description: "Top Coder Open 2015 Round 2: the PathDefense problem."
image: /articles/tco-2015-round-2-path-defense/pathdefense-seed1-init.png
---

_TopCoder TCO 2015 (25-05-2015)_

## Round 2: PathDefense

The full statement of the problem for the second round of TCO 2015 is available [here][1].

A short summary of the problem; we have:

- A plane with x and y coordinates between 20 and 60 (inclusive) with bases and paths leading to the bases
- The money available at the start, _money_ (initialized with the sum of the various values of the _towers_)
- The health of the _creatures_, given by _creepHealth_, which is the starting health of each creature; every 500th iteration (500,1000,1500) the creatures' health doubles.
- The amount of money _creepMoney_ earned after killing a creature
- The number of available defense tower types _towerType_ to kill the creatures
- The creatures, _creep_, with their position and remaining health
- the health of each base, _baseHealth_

The aim of the game is to use **towers** to defend **bases**, each starting with 1000 health points, that are attacked by the **creep** creatures, and to maximize the final money in the till.

The score is given by the **money** (sum of each base's remaining health and the money in the till).

An **init** method must be implemented, taking as parameters the plane _board_, the integer _money_, the integer _creepHealth_, the integer _creepMoney_ and the integer _towerType_.

- board: the coordinate plane
- money: the starting money
- creepHealth: the starting health of the creatures
- creepMoney: the money earned after killing a creature
- towerType: the available defense tower types

And a **placeTowers** method, called _2000 times_ by the visualizer, taking as parameters the array of _creep_, the current value of the till _money_ and the remaining health of each base _baseHealth_.

- creep: the coordinates of the creatures in the plane
- money: the money currently in the till
- baseHealth: the current health of the bases

> **Note:** the _creep_ only move along the paths leading to the bases (each base can have 0 to n paths leading to it).

> The _towers_ have an attack radius, a strength and a cost. The attack radius **range** is defined as follows: if the tower is at (X1,Y1) and its _range_ is R, then the creature at (X2,Y2) is attacked iff `(X1-X2)*(X1-X2)+(Y1-Y2)*(Y1-Y2)<=R*R`.

## Score

This year on TopCoder, scoring changed and now works as follows:

- the result of each test case of the solution is compared with the results of that test case for all participants at the moment the solution is **submitted** on the site; if you have more you score 1 point, if the scores are identical you score 0.5 point, and otherwise 0 points.
- the total score is the sum of the test case scores, normalized by the number of competitors and multiplied by 100000.

## Execution

Rules:

- Time limit: 20 seconds per test case
- Memory: 1024MB
- Code size: 1MB
- Compilation: 60 seconds

The manual and an executable test **JAR** are available on the [site][2].

You can even see the [source code][3] of the visualizer, written in java.

Here is the result of my algorithm for test case 1:

![Seed 1 init](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-init.png)

![Seed 1 first tower](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-firsttower.png)

![Seed 1 final](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-final.png)

And for test case 2:

![Seed 2 init](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-init.png)

![Seed 2 first tower](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-firsttower.png)

![Seed 2 final](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-final.png)

## Solution

- I simply used the A-star algorithm to simulate the movement of the creatures on the plane
- and a formula taking all the parameters into account to determine the number of towers to buy
- greedy placement of the towers according to their firepower
- many small code optimizations for the various test cases

Provisional submission score: 597,041.42 and final: **564,610.95**

Here are my scores for the first 10 grids:

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
