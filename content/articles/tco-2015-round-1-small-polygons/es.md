---
title: "TCO 2015 - Ronda 1 - SmallPolygons"
slug: tco-2015-ronda-1-small-polygons
date: 2015-06-20
description: "Top Coder Open 2015 Ronda 1: el problema SmallPolygons."
image: /articles/tco-2015-round-1-small-polygons/seed-5-np-1368-n-6-polygonization-180sec.png
---

_TopCoder TCO 2015 (20-04-2015)_

## Ronda 1: SmallPolygons

El enunciado completo del problema planteado en la primera ronda del TCO 2015 está disponible [aquí][1].

Breve resumen del problema; tenemos:

- Un plano de coordenadas x e y comprendidas entre 0 y 699
- Una lista de puntos en el plano.
- Y un número máximo de polígonos que se deben construir

El objetivo del juego es formar polígonos con los puntos sin superar el número de polígonos dado y minimizando el área de los polígonos así creados.

La fórmula de cálculo de la puntuación es **suma de las áreas de los polígonos**.

Hay que implementar un método **choosePolygons** que recibe como parámetros el array de enteros **points** y un entero **N**.

- points: corresponde a la lista de puntos
- N: corresponde al máximo de polígonos

El método **choosePolygons** debe devolver cada polígono, en forma de array de los índices de los puntos que deben formar un polígono.

> el orden de los puntos de la lista debe conservarse para poder identificar cada punto más adelante

## Puntuación

Este año en TopCoder, el sistema de puntuación ha cambiado y ahora es el siguiente:

- el resultado de cada caso de prueba de la solución se compara con los resultados de ese caso de prueba de todos los participantes en el momento del **submit** de la solución en el sitio; si se tiene más, se gana 1 punto, si las puntuaciones son idénticas, 0.5 puntos, y si no, 0 puntos.
- la puntuación total es la suma de las puntuaciones de los casos de prueba normalizada con el número de candidatos

## Ejecución

Reglas:

- Tiempo límite: 10 segundos por caso de prueba
- Memoria: 1024MB
- Tamaño del código: 1MB
- Compilación: 30 segundos

El manual y un **JAR** ejecutable de prueba están disponibles en el [sitio][2].

Incluso se puede ver el [código fuente][3] del visualizador, hecho en java.

Este es el resultado de mi algoritmo para algunos casos de prueba:

![Captura seed 1](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed1.png)

![Captura seed 2](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed2.png)

![Captura seed 5](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed5-saone.png)

## Solución

> Se me escapó una cosa, la "polygonization", el algoritmo que permitía construir un polígono simple "rápidamente" (en su lugar usé una ordenación polar de los puntos -> lo que da una estrella más difícil de optimizar y de recortar después...)

![Captura seed 5 sortclockwise](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed5-sortclockwise.png)

> **polygonization**:
>
> 1. cálculo del triángulo de área mínima en la lista de puntos (son los 3 primeros puntos ordenados)
> 2. para cada "vértice" (lado del polígono formado por los puntos i e i + 1), cálculo del punto medio del vértice y, entre todos los puntos restantes, se conserva el más cercano a un vértice
> 3. adición del punto entre los 2 puntos del vértice del polígono
> 4. repetir 2 y 3 hasta que se hayan usado todos los puntos

Seed 5 con **polygonization**:

![Captura seed 5 polygonization](/articles/tco-2015-round-1-small-polygons/seed-5-np-1368-n-6-polygonization-180sec.png)

Y mi solución:

- ordenación polar de los puntos para obtener polígonos válidos (obtención de una solución mínima)

    ![Captura seed 3 sortClockWise](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3-sortclockwise.png)

- uso del algoritmo K-Means para repartir los puntos en N listas de puntos y después reordenación de los puntos con la ordenación polar

    ![Captura seed 3 k-means](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3-kmeans.png)

- optimización de los polígonos con un algoritmo SA (intercambiando puntos entre los polígonos)

    ![Captura seed 3](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3.png)

> para las cuadrículas _pequeñas_, uso de un algoritmo Beam Search para encontrar _la_ mejor solución...

Puntuación provisional del submit: 69,40 y final: **1 382,88**

Mejor clasificación en el TCO: [46.º][4] y código fuente de la solución [aquí][5].

Estas son mis puntuaciones para las 10 primeras cuadrículas:

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
