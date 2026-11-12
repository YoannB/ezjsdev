---
title: "TCO 2014 - Ronda 1 - SquareRemover"
slug: tco-2014-ronda-1-square-remover
date: 2014-04-24
description: "Top Coder Open 2014 Ronda 1: el problema SquareRemover."
image: /articles/tco-2014-round-1-square-remover/visualizer.png
---

_TopCoder TCO 2014 (24-04-2014)_

## Ronda 1: SquareRemover

El enunciado completo del problema planteado este año en la primera ronda del TCO está disponible [aquí][1].

Breve resumen del problema; tenemos:

- Una cuadrícula de NxN (8<=N<=16) en la que cada celda está coloreada con uno de los colores (4<=colores<=6)
- Un buffer de zonas siguientes; cada zona se compone de 4 celdas.

El objetivo del juego es reunir de 4 en 4 las celdas del mismo color, que se destruyen y luego se sustituyen por la siguiente zona del buffer.

Cada zona de 4 celdas destruida aporta **1 punto**.

Hay que implementar un método **playIt** que recibe como parámetros un entero **colors**, un array de strings **board** y un entero **startSeed**.

- colors: corresponde al número de colores posibles de la cuadrícula
- board: representa la cuadrícula en la forma ["0123","2031","0221","3201"]
- startSeed: es el entero que permite generar la nueva zona

    ```
    A[0] = startSeed
    A[i] = (A[i-1] * 48271) MOD 2147483647
    ```

El método **playIt** debe devolver 10000 movimientos, es decir, un array de 30000 enteros:

- 3\*i: fila de la celda a mover
- 3\*i+1: columna de la celda a mover
- 3\*i+2: dirección en la que mover la celda (0 - up, 1 - right, 2 - down, 3 - left)

Un movimiento consiste en intercambiar el color de la celda a mover con el de la celda situada en esa dirección.

## Puntuación

En TopCoder, el sistema de puntuación es el siguiente:

- el resultado de cada caso de prueba de la solución se compara con el mejor resultado de ese caso de prueba entre todos los participantes en el momento del **submit** de la solución en el sitio.
- el primero del caso de prueba obtiene 10000 puntos y los demás una puntuación proporcional
- la puntuación total es la suma de las puntuaciones de los casos de prueba normalizada con la puntuación del mejor

## Ejecución

Reglas:

- Tiempo límite: 30 segundos por caso de prueba
- Memoria: 1024MB
- Tamaño del código: 1MB
- Compilación: 60 segundos

El manual y un **JAR** ejecutable de prueba están disponibles en el [sitio][2].

Incluso se puede ver el [código fuente][3] del visualizador, hecho en java.

![Captura del visualizador](/articles/tco-2014-round-1-square-remover/visualizer.png)

El objetivo del juego es reunir los colores de 4 en 4:

![Ejemplo de un movimiento normal](/articles/tco-2014-round-1-square-remover/move-1.png)

Es posible hacer combinaciones en un único movimiento y así acumular puntos:

![Ejemplo de un movimiento doble](/articles/tco-2014-round-1-square-remover/move-2.png)

## Solución

Como no tuve mucho tiempo y no soy un experto (solo 4/5 maratones en el último año) en comparación con la mayoría de los participantes, que también hacen partidas de 8 h cronometradas todo el año y la mayoría de los maratones, mi puntuación final está lejos de ser la mejor, pero el algoritmo de mi solución es el que usaron todas las mejores puntuaciones, así que me permito presentarlo aquí con un poco más de detalle.

Este algoritmo es el [**Beam Search**][4] ([Algorithme de recherche en faisceau][5] en francés).

El principio es jugar todas las jugadas de una iteración y conservar, entre las mejores soluciones, un número de soluciones llamado **WIDTH**. Luego, para cada una de esas soluciones, se vuelven a lanzar todas las jugadas y se conservan de nuevo las **WIDTH** mejores.

La gran dificultad para aplicar el algoritmo a este problema es la viabilidad matemática dado el número de soluciones posibles: (16 \* 16 \* 4) ^ 10000 -> infinito

Por lo tanto, es necesario limitar el número de puntos a jugar en cada iteración y limitar también el **WIDTH** del algoritmo.

Pseudocódigo JAVA:

```java
 private State[] beamSearch(int WIDTH) {
	//init
	root = new State(0);
	State[] current = new State[4*points.length], currentChildren;
	State state;
	int count = 0;
	for (int p = 0; p < betterPoints.length; p++) {
		for (int d = 0; d < 4; d++) {
			if (p2 > -1/**punto válido**/) {
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
					if (p2 > -1/**punto válido**/) {
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

Para elegir los mejores puntos a mover, decidí tomar los puntos más cercanos a una zona de 3 celdas del mismo color y luego, si no los había, consideré por pares las celdas más cercanas a una zona de 2 celdas del mismo color.

Puntuación provisional del submit: 446164,62 y final: **418829,75**

Estas son mis puntuaciones para las 10 primeras cuadrículas:

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

¡¡¡El primero tiene aproximadamente el doble en cada puntuación!!!

**Observación:** Lástima, mis puntuaciones eran mejores, pero tenía un pequeño error en mi código final que hizo fallar muchos casos de prueba; la próxima vez espero ser más cuidadoso.

[1]: http://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=15938&pm=13132
[2]: http://www.topcoder.com/contest/problem/SquareRemover/manual.html
[3]: http://www.topcoder.com/contest/problem/SquareRemover/SquareRemoverVis.java
[4]: http://en.wikipedia.org/wiki/Beam_search
[5]: http://fr.wikipedia.org/wiki/Algorithme_de_recherche_en_faisceau
