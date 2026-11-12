---
title: "TCO 2014 - Round 3 - CollageMaker"
slug: tco-2014-round-3-collage-maker
date: 2014-07-09
description: "Top Coder Open 2014 Round 3: the CollageMaker problem."
image: /articles/tco-2014-round-3-collage-maker/visualizer.png
---

_TopCoder TCO 2014 (09-07-2014)_

## Round 3: CollageMaker

The full statement of the problem for the last round of the TCO is available [here][1].

A short summary of the problem; we have:

- A directory containing 1000 grayscale images
- For each test case, we are given a target image of at most 300 pixels in length and width, and 200 other images of at most 100 pixels in length and width.

The aim of the game is to rebuild the target image using the 200 other images.

The score is obtained by computing the grayscale differences between each pixel.

A **compose** method must be implemented, taking as parameter an integer array **data**. The array is made of 201 images described as follows:

- an integer H for the height of the image
- an integer W for the width of the image
- and HxW integers corresponding to the pixels of the image (grayscale from 0 to 255)

The images do not need to keep their length / width ratio.

> **Note:** images cannot be flipped, nor have a greater length or a greater width than those given as parameters.

## Score

On TopCoder, scoring works as follows:

- the result of each test case of the solution is compared with the best result for that test case among all participants at the moment the solution is **submitted** on the site.
- the first one for the test case gets 10000 points and the others get a proportional score
- the total score is the sum of the test case scores, normalized by the best score

## Execution

Rules:

- Time limit: 10 seconds per test case
- Memory: 1024MB
- Code size: 256KB
- Compilation: 60 seconds

The manual and an executable test **JAR** are available on the [site][2].

You can even see the [source code][3] of the visualizer, written in java.

Here is the result of my algorithm for test case 1:

![Visualizer screenshot](/articles/tco-2014-round-3-collage-maker/visualizer.png)

## Solution

- First, I chose to cut the target image using the minimum width / length available among the 200 given images, and to use a **greedy** algorithm to position them.
- I then reduced the size of the zones to optimize the score.
- For each image, I then tried to extend it in height and width.
- Then I sort the images by decreasing relative score and cut the images with the highest scores into 4 sub-parts (I went for the extremely simple; the best scores cut either along the width or along the length).
- I finish the processing with an **SA** algorithm (simulated annealing) to swap images with one another.

Provisional submission score: 809,648.79 and final: **807,646.95**

Here are my scores for the first 10 grids:

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

**Note:** you might have thought of image analysis, but the best scores of the marathon clearly prove otherwise; here is a screenshot from the winner, **[ainu7][ainu7]**:

![ainu7-seed1](/articles/tco-2014-round-3-collage-maker/ainu7.png)

[1]: http://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=16012&pm=13246
[2]: http://community.topcoder.com/contest/problem/CollageMaker/manual.html
[3]: http://www.topcoder.com/contest/problem/CollageMaker/CollageMakerVis.java
[ainu7]: http://community.topcoder.com/tc?module=MemberProfile&cr=22653720
