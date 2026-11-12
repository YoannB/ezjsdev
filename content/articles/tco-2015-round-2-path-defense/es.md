---
title: "TCO 2015 - Ronda 2 - PathDefense"
slug: tco-2015-ronda-2-path-defense
date: 2015-07-20
description: "Top Coder Open 2015 Ronda 2: el problema PathDefense."
image: /articles/tco-2015-round-2-path-defense/pathdefense-seed1-init.png
---

_TopCoder TCO 2015 (25-05-2015)_

## Ronda 2: PathDefense

El enunciado completo del problema planteado en la segunda ronda del TCO 2015 está disponible [aquí][1].

Breve resumen del problema; tenemos:

- Un plano de coordenadas x e y comprendidas entre 20 y 60 (límites incluidos) con bases y caminos que llevan a las bases
- El dinero disponible al inicio, _money_ (inicializado con la suma de los distintos valores de las _towers_)
- La vida de los _bichos_, dada por _creepHealth_, indica la vida inicial de cada bicho; cada 500 iteraciones (500,1000,1500) la vida de los bichos se duplica.
- La cantidad de dinero _creepMoney_ que se gana al matar un bicho
- El número de tipos de torres de defensa disponibles _towerType_ para matar a los bichos
- Los bichos _creep_ con su posición y su vida restante
- la vida de cada una de las bases _baseHealth_

El objetivo del juego es defender con **towers** unas **bases** que empiezan cada una con 1000 puntos de vida y que son atacadas por los bichos **creep**, y maximizar el dinero final en la caja.

La puntuación viene dada por el dinero **money** (suma de la vida restante de cada base y del dinero en la caja).

Hay que implementar un método **init** que recibe como parámetros el plano _board_, el entero _money_, el entero _creepHealth_, el entero _creepMoney_ y el entero _towerType_.

- board: corresponde al plano de coordenadas
- money: corresponde al dinero inicial
- creepHealth: corresponde a la vida inicial de los bichos
- creepMoney: corresponde al dinero ganado al matar un bicho
- towerType: corresponde a los tipos de torres de defensa disponibles

Y un método **placeTowers** al que el visualizador llamará _2000 veces_ y que recibe como parámetros el array de _creep_, el valor actual de la caja _money_ y la vida restante de cada base _baseHealth_.

- creep: corresponde a las coordenadas de los bichos en el plano
- money: corresponde al dinero que hay actualmente en la caja
- baseHealth: corresponde a la vida actual de las bases

> **Observación:** los _creep_ solo se desplazan por los caminos que llevan a las bases (cada base puede tener de 0 a n caminos que lleven a ella).

> Las _towers_ tienen un perímetro de ataque, una fuerza y un coste. El perímetro de ataque **range** se define así: si la torre está en (X1,Y1) y su _range_ es R, el bicho en (X2,Y2) será atacado si y solo si `(X1-X2)*(X1-X2)+(Y1-Y2)*(Y1-Y2)<=R*R`.

## Puntuación

Este año en TopCoder, el sistema de puntuación ha cambiado y ahora es el siguiente:

- el resultado de cada caso de prueba de la solución se compara con los resultados de ese caso de prueba de todos los participantes en el momento del **submit** de la solución en el sitio; si se tiene más, se gana 1 punto, si las puntuaciones son idénticas, 0.5 puntos, y si no, 0 puntos.
- la puntuación total es la suma de las puntuaciones de los casos de prueba normalizada con el número de candidatos y multiplicada por 100000.

## Ejecución

Reglas:

- Tiempo límite: 20 segundos por caso de prueba
- Memoria: 1024MB
- Tamaño del código: 1MB
- Compilación: 60 segundos

El manual y un **JAR** ejecutable de prueba están disponibles en el [sitio][2].

Incluso se puede ver el [código fuente][3] del visualizador, hecho en java.

Este es el resultado de mi algoritmo para el caso de prueba 1:

![Seed 1 init](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-init.png)

![Seed 1 first tower](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-firsttower.png)

![Seed 1 final](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-final.png)

Y para el caso de prueba 2:

![Seed 2 init](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-init.png)

![Seed 2 first tower](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-firsttower.png)

![Seed 2 final](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-final.png)

## Solución

- simplemente usé el algoritmo A-star para simular el desplazamiento de los bichos por el plano
- y una fórmula que tiene en cuenta todos los parámetros para determinar el número de torres que comprar
- posicionamiento greedy de las torres según su potencia de ataque
- numerosas pequeñas optimizaciones de código para los distintos casos de prueba

Puntuación provisional del submit: 597 041,42 y final: **564 610,95**

Estas son mis puntuaciones para las 10 primeras cuadrículas:

- 0\) 4721.0
- 1\) 19310.0
- 2\) 11505.0
- 3\) 9297.0
- 4\) 4404.0
- 5\) 7527.0
- 6\) 7373.0
- 7\) 33795.0
- 8\) 7670.0
- 9\) 349.0

[1]: https://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=16471&pm=13805
[2]: http://www.topcoder.com/contest/problem/PathDefense/manual.html
[3]: http://www.topcoder.com/contest/problem/PathDefense/PathDefenseVis.java
