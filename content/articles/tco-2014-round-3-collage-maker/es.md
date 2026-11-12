---
title: "TCO 2014 - Ronda 3 - CollageMaker"
slug: tco-2014-ronda-3-collage-maker
date: 2014-07-09
description: "Top Coder Open 2014 Ronda 3: el problema CollageMaker."
image: /articles/tco-2014-round-3-collage-maker/visualizer.png
---

_TopCoder TCO 2014 (09-07-2014)_

## Ronda 3: CollageMaker

El enunciado completo del problema planteado en la última ronda del TCO está disponible [aquí][1].

Breve resumen del problema; tenemos:

- Un directorio que contiene 1000 imágenes en escala de grises
- Para cada caso de prueba, se nos da una imagen objetivo de longitud y anchura máximas de 300 píxeles y otras 200 imágenes de longitud y anchura máximas de 100 píxeles.

El objetivo del juego es reconstruir la imagen objetivo con ayuda de las otras 200 imágenes.

La puntuación se obtiene calculando las diferencias de nivel de gris entre cada píxel.

Hay que implementar un método **compose** que recibe como parámetro un array de enteros **data**. El array se compone de 201 imágenes descritas así:

- un entero H para la altura de la imagen
- un entero W para la anchura de la imagen
- y HxW enteros correspondientes a los píxeles de la imagen (niveles de gris de 0 a 255)

Las imágenes no necesitan conservar su relación longitud / anchura.

> **Observación:** las imágenes no se pueden girar ni tener una longitud o una anchura mayores que las proporcionadas como parámetro.

## Puntuación

En TopCoder, el sistema de puntuación es el siguiente:

- el resultado de cada caso de prueba de la solución se compara con el mejor resultado de ese caso de prueba entre todos los participantes en el momento del **submit** de la solución en el sitio.
- el primero del caso de prueba obtiene 10000 puntos y los demás una puntuación proporcional
- la puntuación total es la suma de las puntuaciones de los casos de prueba normalizada con la puntuación del mejor

## Ejecución

Reglas:

- Tiempo límite: 10 segundos por caso de prueba
- Memoria: 1024MB
- Tamaño del código: 256KB
- Compilación: 60 segundos

El manual y un **JAR** ejecutable de prueba están disponibles en el [sitio][2].

Incluso se puede ver el [código fuente][3] del visualizador, hecho en java.

Este es el resultado de mi algoritmo para el caso de prueba 1:

![Captura del visualizador](/articles/tco-2014-round-3-collage-maker/visualizer.png)

## Solución

- Primero decidí recortar la imagen objetivo tomando la anchura / longitud mínima disponible de las 200 imágenes proporcionadas y usando un algoritmo **greedy** para posicionarlas.
- Después reduje el tamaño de las zonas para optimizar la puntuación.
- Para cada imagen, intenté luego extenderla en altura y en anchura.
- Luego ordeno las imágenes por puntuación relativa decreciente y recorto las imágenes con las puntuaciones más altas en 4 subpartes (opté por lo extremadamente simple; las mejores puntuaciones recortaron o bien a lo ancho o bien a lo largo).
- Termino el tratamiento con un algoritmo **SA** (simulated annealing) para intercambiar las imágenes entre sí.

Puntuación provisional del submit: 809 648,79 y final: **807 646,95**

Estas son mis puntuaciones para las 10 primeras cuadrículas:

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

**Observación:** se podría pensar en análisis de imagen, pero las mejores puntuaciones del maratón demuestran claramente lo contrario; esta es una captura del primero, **[ainu7][ainu7]**:

![ainu7-seed1](/articles/tco-2014-round-3-collage-maker/ainu7.png)

[1]: http://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=16012&pm=13246
[2]: http://community.topcoder.com/contest/problem/CollageMaker/manual.html
[3]: http://www.topcoder.com/contest/problem/CollageMaker/CollageMakerVis.java
[ainu7]: http://community.topcoder.com/tc?module=MemberProfile&cr=22653720
