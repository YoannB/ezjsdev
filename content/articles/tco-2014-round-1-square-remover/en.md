---
title: "TCO 2014 - Round 1 - SquareRemover"
slug: tco-2014-round-1-square-remover
date: 2014-04-24
description: "Top Coder Open 2014 Round 1: the SquareRemover problem."
image: /articles/tco-2014-round-1-square-remover/visualizer.png
---

_TopCoder TCO 2014 (24-04-2014)_

## Round 1: SquareRemover

The full statement of this year's problem for the first round of the TCO is available [here][1].

A short summary of the problem; we have:

- An NxN grid (8<=N<=16) in which each cell is colored with one of the colors (4<=colors<=6)
- A buffer of next zones, each zone being made of 4 cells.

The aim of the game is to gather cells of the same color in groups of 4, which are destroyed and then replaced by the next zone of the buffer.

Each destroyed zone of 4 cells earns **1 point**.

A **playIt** method must be implemented, taking as parameters an integer **colors**, a string array **board** and an integer **startSeed**.

- colors: the number of possible colors for the grid
- board: represents the grid in the form ["0123","2031","0221","3201"]
- startSeed: the integer used to generate the new zone

    ```
    A[0] = startSeed
    A[i] = (A[i-1] * 48271) MOD 2147483647
    ```

The **playIt** method must return 10000 moves, i.e. an array of 30000 integers:

- 3\*i: row of the cell to move
- 3\*i+1: column of the cell to move
- 3\*i+2: direction in which to move the cell (0 - up, 1 - right, 2 - down, 3 - left)

A move amounts to swapping the color of the cell to move with the cell located in that direction.

## Score

On TopCoder, scoring works as follows:

- the result of each test case of the solution is compared with the best result for that test case among all participants at the moment the solution is **submitted** on the site.
- the first one for the test case gets 10000 points and the others get a proportional score
- the total score is the sum of the test case scores, normalized by the best score

## Execution

Rules:

- Time limit: 30 seconds per test case
- Memory: 1024MB
- Code size: 1MB
- Compilation: 60 seconds

The manual and an executable test **JAR** are available on the [site][2].

You can even see the [source code][3] of the visualizer, written in java.

![Visualizer screenshot](/articles/tco-2014-round-1-square-remover/visualizer.png)

The aim of the game being to gather the colors in groups of 4:

![Example of a normal move](/articles/tco-2014-round-1-square-remover/move-1.png)

Combinations can be made in a single move, thus adding up points:

![Example of a double move](/articles/tco-2014-round-1-square-remover/move-2.png)

## Solution

Not having had much time and not being an expert (only 4/5 marathons in the past year) compared with most participants, who also take part in 8-hour timed matches all year round and in most marathons, my final score is far from the best, but my solution's algorithm is the one all the top scores used, so I am taking the liberty of presenting it here in a little more detail.

This algorithm is [**Beam Search**][4] ([Algorithme de recherche en faisceau][5] in French).

The principle is to play every move of an iteration and to keep, among the best solutions, a number of solutions called **WIDTH**. Then, for each of these solutions, all moves are played again and the **WIDTH** best are kept once more.

The great difficulty in applying the algorithm to this problem is the mathematical feasibility given the number of possible solutions: (16 \* 16 \* 4) ^ 10000 -> infinity

It is therefore necessary to limit the number of points to play at each iteration and also to limit the algorithm's **WIDTH**.

JAVA pseudo code:

```java
 private State[] beamSearch(int WIDTH) {
	//init
	root = new State(0);
	State[] current = new State[4*points.length], currentChildren;
	State state;
	int count = 0;
	for (int p = 0; p < betterPoints.length; p++) {
		for (int d = 0; d < 4; d++) {
			if (p2 > -1/**valid point**/) {
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
					if (p2 > -1/**valid point**/) {
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

To choose the best points to move, I chose to take the points closest to a zone of 3 cells of the same color and then, if there were none, I considered in pairs the cells closest to a zone of 2 cells of the same color.

Provisional submission score: 446164.62 and final: **418829.75**

Here are my scores for the first 10 grids:

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

The winner has roughly double for each score!!!

**Note:** Too bad, my scores were better, but I had a small error in my final code that made many test cases fail; next time, I hope I will be more careful.

[1]: http://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=15938&pm=13132
[2]: http://www.topcoder.com/contest/problem/SquareRemover/manual.html
[3]: http://www.topcoder.com/contest/problem/SquareRemover/SquareRemoverVis.java
[4]: http://en.wikipedia.org/wiki/Beam_search
[5]: http://fr.wikipedia.org/wiki/Algorithme_de_recherche_en_faisceau
