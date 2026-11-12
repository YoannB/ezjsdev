---
title: "TCO 2014 - Ronda 2 - RectanglesAndHoles"
slug: tco-2014-ronda-2-rectangles-and-holes
date: 2014-06-11
description: "Top Coder Open 2014 Ronda 2: el problema RectanglesAndHoles."
image: /articles/tco-2014-round-2-rectangles-and-holes/visualizer.png
---

_TopCoder TCO 2014 (11-06-2014)_

## Ronda 2: RectanglesAndHoles

El enunciado completo del problema planteado en la segunda ronda del TCO está disponible [aquí][1].

Breve resumen del problema; tenemos:

- Un plano de coordenadas x e y comprendidas entre -1000000 y 1000000
- Y dos listas de enteros comprendidos entre 100 y 1000 que corresponden a los 2 lados de un rectángulo.

El objetivo del juego es formar "agujeros" con los rectángulos.

La fórmula de cálculo de la puntuación es **número de agujeros x número de agujeros x suma del área de los agujeros**.

Hay que implementar un método **place** que recibe como parámetros los dos arrays de enteros **A** y **B**.

- A: corresponde a las longitudes del primer lado de cada rectángulo
- B: corresponde a las longitudes del segundo lado de cada rectángulo

A continuación, consideraré el siguiente rectángulo con sus 4 vértices (a,b,c,d):

```
a__b
|  |
|__|
c  d
```

El método **place** debe devolver la posición de cada rectángulo, es decir, sus coordenadas x e y para el vértice **c** y la orientación del rectángulo en función de los lados proporcionados como parámetros:

- 3\*i: coordenada x
- 3\*i+1: coordenada y
- 3\*i+2: 0 o 1 según se quiera invertir o no la orientación del rectángulo

> **Observación:** la orientación permite controlar la longitud y la anchura de cada rectángulo.

## Puntuación

En TopCoder, el sistema de puntuación es el siguiente:

- el resultado de cada caso de prueba de la solución se compara con el mejor resultado de ese caso de prueba entre todos los participantes en el momento del **submit** de la solución en el sitio.
- el primero del caso de prueba obtiene 10000 puntos y los demás una puntuación proporcional
- la puntuación total es la suma de las puntuaciones de los casos de prueba normalizada con la puntuación del mejor

## Ejecución

Reglas:

- Tiempo límite: 10 segundos por caso de prueba
- Memoria: 1024MB
- Tamaño del código: 1MB
- Compilación: 60 segundos

El manual y un **JAR** ejecutable de prueba están disponibles en el [sitio][2].

Incluso se puede ver el [código fuente][3] del visualizador, hecho en java.

Este es el resultado de mi algoritmo para el caso de prueba 1:

![Captura del visualizador](/articles/tco-2014-round-2-rectangles-and-holes/visualizer.png)

## Solución

- No dediqué mucho tiempo a programar mi solución; partí de la idea de hacer un **gran agujero** y un **máximo de pequeños agujeros** al lado. Para ello, tomé los rectángulos y los ordené según su lado más largo (girando los rectángulos desde el principio).
- Sumé los lados más largos para determinar una longitud **D** de aproximadamente **TOTAL de los lados / COEFICIENTE**, con COEFICIENTE tomado de la siguiente lista {7, 6.75, 7.25, 6.25, 6.5, 7.5}.
- Después, tracé un cuadrado de lado **D**/4 y lo transformé en círculo estirando cada lado.
- Para terminar, con los rectángulos restantes usé el algoritmo **SA** para hacer el mayor número de pequeños agujeros.

Puntuación provisional del submit: 489 126,27 y final: **488 719,07**

Estas son mis puntuaciones para las 10 primeras cuadrículas:

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
