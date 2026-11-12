---
title: "TCO 2015 - Ronda 3 - PegJump"
slug: tco-2015-ronda-3-peg-jump
date: 2015-07-22
description: "Top Coder Open 2015 Ronda 3: el problema PegJump."
image: /articles/tco-2015-round-3-peg-jump/pegjump-seed1-init.png
---

_TopCoder TCO 2015 (22-06-2015)_

## Ronda 3: PegJump

> Una variante del SOLITARIO

El enunciado completo del problema planteado en la tercera ronda del TCO 2015 está disponible [aquí][1].

Breve resumen del problema; tenemos:

- Un plano de coordenadas x e y comprendidas entre 20 y 60, que contiene la posición de los **peg**.
- Y una lista de enteros que corresponden a los valores de los **peg**.

Como en el solitario, el objetivo del juego es hacer saltos de **peg** para _comerse_ a los demás, pero con el objetivo principal de hacer _cadenas_ de saltos de **pegs**.

La fórmula de cálculo de la puntuación es **número de saltos de peg x suma de los valores de los peg comidos**.

Hay que implementar un método **getMoves** que recibe como parámetros un array de enteros **pegValue** y un array de strings **board**.

- pegValue: corresponde a los valores de cada tipo de **peg**
- board: corresponde al plano y contiene los **peg** con su tipo

El método **getMoves** debe devolver la lista de saltos de **peg**, partiendo de las coordenadas x e y del **peg** que debe saltar y de la dirección del salto: Up, Down, Left, Right. Cuando se encadenan saltos, basta con concatenar las direcciones una tras otra:

- ejemplo de un salto simple: "1 5 U"
- ejemplo de un _gran_ salto: "1 5 UDLRUDLLR"

## Puntuación

Este año en TopCoder, el sistema de puntuación ha cambiado y ahora es el siguiente:

- el resultado de cada caso de prueba de la solución se compara con los resultados de ese caso de prueba de todos los participantes en el momento del **submit** de la solución en el sitio; si se tiene más, se gana 1 punto, si las puntuaciones son idénticas, 0.5 puntos, y si no, 0 puntos.
- la puntuación total es la suma de las puntuaciones de los casos de prueba normalizada con el número de candidatos

## Ejecución

Reglas:

- Tiempo límite: 15 segundos por caso de prueba
- Memoria: 1024MB
- Tamaño del código: 1MB
- Compilación: 30 segundos

El manual y un **JAR** ejecutable de prueba están disponibles en el [sitio][2].

Incluso se puede ver el [código fuente][3] del visualizador, hecho en java.

Este es el resultado de mi algoritmo para el caso de prueba 1:

![Ejemplo seed 1 init](/articles/tco-2015-round-3-peg-jump/pegjump-seed1-init.png)

![Ejemplo seed 1 final](/articles/tco-2015-round-3-peg-jump/pegjump-seed1-final.png)

## Solución

- Muy lejos de las puntuaciones de los primeros, no me preocupé lo suficiente de los saltos encadenados por una sola ficha...
- Prueba de varios algoritmos: el recorrido en profundidad DFS (Depth First Search), Beam Search ...
- División de las cuadrículas grandes en 2, 4, 9 o 16 partes para tratarlas más rápido
- Uso de un Beam para simplificar las cuadrículas antes de tratarlas (recorrido de todas las celdas de 4 en 4 y hacer saltos mientras haya 4 celdas con _peg_)
- Encontrar la mejor secuencia de saltos y luego intentar mejorarla

Puntuación provisional del submit: 98 869,77 y final: **110 956,41**

Estas son mis puntuaciones para las 10 primeras cuadrículas:

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
