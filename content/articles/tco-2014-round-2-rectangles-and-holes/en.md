---
title: "TCO 2014 - Round 2 - RectanglesAndHoles"
slug: tco-2014-round-2-rectangles-and-holes
date: 2014-06-11
description: "Top Coder Open 2014 Round 2: the RectanglesAndHoles problem."
image: /articles/tco-2014-round-2-rectangles-and-holes/visualizer.png
---

_TopCoder TCO 2014 (11-06-2014)_

## Round 2: RectanglesAndHoles

The full statement of the problem for the second round of the TCO is available [here][1].

A short summary of the problem; we have:

- A plane with x and y coordinates between -1000000 and 1000000
- And two lists of integers between 100 and 1000 corresponding to the 2 sides of a rectangle.

The aim of the game is to form "holes" with the rectangles.

The score formula is **number of holes x number of holes x sum of the area of the holes**.

A **place** method must be implemented, taking as parameters the two integer arrays **A** and **B**.

- A: the lengths of the first side of each rectangle
- B: the lengths of the second side of each rectangle

From here on, I will consider the following rectangle with its 4 vertices (a,b,c,d):

```
a__b
|  |
|__|
c  d
```

The **place** method must return the position of each rectangle, i.e. the x and y coordinates of vertex **c** and the orientation of the rectangle relative to the sides given as parameters:

- 3\*i: x coordinate
- 3\*i+1: y coordinate
- 3\*i+2: 0 or 1 depending on whether you want to flip the orientation of the rectangle

> **Note:** the orientation makes it possible to control the length and width of each rectangle.

## Score

On TopCoder, scoring works as follows:

- the result of each test case of the solution is compared with the best result for that test case among all participants at the moment the solution is **submitted** on the site.
- the first one for the test case gets 10000 points and the others get a proportional score
- the total score is the sum of the test case scores, normalized by the best score

## Execution

Rules:

- Time limit: 10 seconds per test case
- Memory: 1024MB
- Code size: 1MB
- Compilation: 60 seconds

The manual and an executable test **JAR** are available on the [site][2].

You can even see the [source code][3] of the visualizer, written in java.

Here is the result of my algorithm for test case 1:

![Visualizer screenshot](/articles/tco-2014-round-2-rectangles-and-holes/visualizer.png)

## Solution

- I did not spend much time coding my solution; I went with the idea of making one **big hole** and a **maximum of small holes** next to it. To do so, I took the rectangles and sorted them by their longest side (flipping the rectangles from the start).
- I summed the longest sides to determine a length **D** of about **TOTAL of the sides / COEFFICIENT**, with COEFFICIENT taken from the following list {7, 6.75, 7.25, 6.25, 6.5, 7.5}.
- Then I drew a square with side **D**/4 and turned it into a circle by stretching each side.
- Finally, with the remaining rectangles, I used the **SA** algorithm to make as many small holes as possible.

Provisional submission score: 489,126.27 and final: **488,719.07**

Here are my scores for the first 10 grids:

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
