---
title: "TCO 2015 - Round 3 - PegJump"
slug: tco-2015-round-3-peg-jump
date: 2015-07-22
description: "Top Coder Open 2015 Round 3: the PegJump problem."
image: /articles/tco-2015-round-3-peg-jump/pegjump-seed1-init.png
---

_TopCoder TCO 2015 (22-06-2015)_

## Round 3: PegJump

> A variant of SOLITAIRE

The full statement of the problem for the third round of TCO 2015 is available [here][1].

A short summary of the problem; we have:

- A plane with x and y coordinates between 20 and 60, containing the position of the **pegs**.
- And a list of integers corresponding to the values of the **pegs**.

As in solitaire, the aim of the game is to make **peg** jumps to _eat_ the others, but with the main goal of making _chains_ of **peg** jumps.

The score formula is **number of peg jumps x sum of the values of the eaten pegs**.

A **getMoves** method must be implemented, taking as parameters an integer array **pegValue** and a string array **board**.

- pegValue: the values of each **peg** type
- board: the plane, containing the **pegs** with their type

The **getMoves** method must return the list of **peg** jumps, starting from the x and y coordinates of the **peg** that jumps and the direction of the jump: Up, Down, Left, Right. When chaining jumps, just concatenate the directions one after another:

- example of a simple jump: "1 5 U"
- example of a _big_ jump: "1 5 UDLRUDLLR"

## Score

This year on TopCoder, scoring changed and now works as follows:

- the result of each test case of the solution is compared with the results of that test case for all participants at the moment the solution is **submitted** on the site; if you have more you score 1 point, if the scores are identical you score 0.5 point, and otherwise 0 points.
- the total score is the sum of the test case scores, normalized by the number of competitors

## Execution

Rules:

- Time limit: 15 seconds per test case
- Memory: 1024MB
- Code size: 1MB
- Compilation: 30 seconds

The manual and an executable test **JAR** are available on the [site][2].

You can even see the [source code][3] of the visualizer, written in java.

Here is the result of my algorithm for test case 1:

![Seed 1 init example](/articles/tco-2015-round-3-peg-jump/pegjump-seed1-init.png)

![Seed 1 final example](/articles/tco-2015-round-3-peg-jump/pegjump-seed1-final.png)

## Solution

- Very far from the top scores; I did not pay enough attention to jumps chained by a single peg...
- Tried several algorithms: depth-first search DFS (Depth First Search), Beam Search ...
- Split big grids into 2, 4, 9 or 16 parts to process them faster
- Used a Beam to simplify the grids before processing them (going through all cells 4 by 4 and jumping as long as there are 4 cells with a _peg_)
- Find the best jump sequence and then try to improve it

Provisional submission score: 98,869.77 and final: **110,956.41**

Here are my scores for the first 10 grids:

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
