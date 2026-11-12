---
title: "TCO 2015 - Round 1 - SmallPolygons"
slug: tco-2015-round-1-small-polygons
date: 2015-06-20
description: "Top Coder Open 2015 Round 1: the SmallPolygons problem."
image: /articles/tco-2015-round-1-small-polygons/seed-5-np-1368-n-6-polygonization-180sec.png
---

_TopCoder TCO 2015 (20-04-2015)_

## Round 1: SmallPolygons

The full statement of the problem for the first round of TCO 2015 is available [here][1].

A short summary of the problem; we have:

- A plane with x and y coordinates between 0 and 699
- A list of points in the plane.
- And a maximum number of polygons to build

The aim of the game is to form polygons with the points without exceeding the given number of polygons, while minimizing the area of the polygons created.

The score formula is **sum of the areas of the polygons**.

A **choosePolygons** method must be implemented, taking as parameters the integer array **points** and an integer **N**.

- points: the list of points
- N: the maximum number of polygons

The **choosePolygons** method must return each polygon, as an array of the indexes of the points that must form a polygon.

> the order of the points in the list must be kept so that each point can be identified later on

## Score

This year on TopCoder, scoring changed and now works as follows:

- the result of each test case of the solution is compared with the results of that test case for all participants at the moment the solution is **submitted** on the site; if you have more you score 1 point, if the scores are identical you score 0.5 point, and otherwise 0 points.
- the total score is the sum of the test case scores, normalized by the number of competitors

## Execution

Rules:

- Time limit: 10 seconds per test case
- Memory: 1024MB
- Code size: 1MB
- Compilation: 30 seconds

The manual and an executable test **JAR** are available on the [site][2].

You can even see the [source code][3] of the visualizer, written in java.

Here is the result of my algorithm for a few test cases:

![Seed 1 screenshot](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed1.png)

![Seed 2 screenshot](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed2.png)

![Seed 5 screenshot](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed5-saone.png)

## Solution

> I missed one thing, "polygonization", the algorithm that made it possible to build a simple polygon "quickly" (instead I used a polar sort of the points -> which gives a star that is harder to optimize and to split afterwards...)

![Seed 5 sortclockwise screenshot](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed5-sortclockwise.png)

> **polygonization**:
>
> 1. compute the triangle with the minimum area from the list of points (these are the first 3 ordered points)
> 2. for each "vertex" (side of the polygon formed by points i and i + 1), compute the middle of the vertex and, among all remaining points, keep the one closest to a vertex
> 3. add the point between the 2 points of the polygon's vertex
> 4. repeat 2 and 3 until all points are used

Seed 5 with **polygonization**:

![Seed 5 polygonization screenshot](/articles/tco-2015-round-1-small-polygons/seed-5-np-1368-n-6-polygonization-180sec.png)

And my solution:

- polar sort of the points to get valid polygons (getting a minimum solution)

    ![Seed 3 sortClockWise screenshot](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3-sortclockwise.png)

- use of the K-Means algorithm to split the points into N lists of points, then reordering of the points with the polar sort

    ![Seed 3 k-means screenshot](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3-kmeans.png)

- optimization of the polygons with an SA algorithm (by swapping points between polygons)

    ![Seed 3 screenshot](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3.png)

> for _small_ grids, use of a Beam Search algorithm to find _the_ best solution...

Provisional submission score: 69.40 and final: **1,382.88**

Best TCO ranking: [46th][4] and source code of the solution [here][5].

Here are my scores for the first 10 grids:

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
