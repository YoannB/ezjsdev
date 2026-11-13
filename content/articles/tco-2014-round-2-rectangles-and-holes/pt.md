---
title: "TCO 2014 - Ronda 2 - RectanglesAndHoles"
slug: tco-2014-ronda-2-rectangles-and-holes
date: 2014-06-11
description: "Top Coder Open 2014 Ronda 2: o problema RectanglesAndHoles."
image: /articles/tco-2014-round-2-rectangles-and-holes/visualizer.png
---

_TopCoder TCO 2014 (11-06-2014)_

## Ronda 2: RectanglesAndHoles

O enunciado completo do problema proposto na segunda ronda do TCO está disponível [aqui][1].

Pequeno resumo do problema, temos:

- Um plano de coordenadas x e y compreendidas entre -1000000 e 1000000
- E duas listas de inteiros compreendidos entre 100 e 1000 correspondentes aos 2 lados de um retângulo.

O objetivo do jogo é formar "buracos" com os retângulos.

A fórmula de cálculo da pontuação é **número de buracos x número de buracos x soma da área dos buracos**.

É preciso implementar um método **place** que recebe como parâmetros os dois arrays de inteiros **A** e **B**.

- A: corresponde aos comprimentos do primeiro lado de cada retângulo
- B: corresponde aos comprimentos do segundo lado de cada retângulo

A seguir, vou considerar o seguinte retângulo com os seus 4 vértices (a,b,c,d):

```
a__b
|  |
|__|
c  d
```

O método **place** deve devolver a posição de cada retângulo, ou seja, as suas coordenadas x e y para o vértice **c** e a orientação do retângulo em função dos lados fornecidos como parâmetros:

- 3\*i: coordenada x
- 3\*i+1: coordenada y
- 3\*i+2: 0 ou 1 conforme se queira ou não inverter a orientação do retângulo

> **Observação:** a orientação permite controlar o comprimento e a largura de cada retângulo.

## Pontuação

No TopCoder, o sistema de pontuação é o seguinte:

- o resultado de cada caso de teste da solução é comparado com o melhor resultado desse caso de teste entre todos os participantes no momento do **submit** da solução no site.
- o primeiro do caso de teste recebe 10000 pontos e os outros uma pontuação proporcional
- a pontuação total é a soma das pontuações dos casos de teste normalizada pela pontuação do melhor

## Execução

Regras:

- Tempo limite: 10 segundos por caso de teste
- Memória: 1024MB
- Tamanho do código: 1MB
- Compilação: 60 segundos

O manual e um **JAR** executável de teste estão disponíveis no [site][2].

É possível até ver o [código-fonte][3] do visualizador, feito em java.

Eis o resultado do meu algoritmo para o caso de teste 1:

![Captura do visualizador](/articles/tco-2014-round-2-rectangles-and-holes/visualizer.png)

## Solução

- Não dediquei muito tempo a programar a minha solução; parti da ideia de fazer um **grande buraco** e um **máximo de pequenos buracos** ao lado. Para isso, peguei nos retângulos e ordenei-os pelo lado mais comprido (rodando os retângulos desde o início).
- Somei os lados mais compridos para determinar um comprimento **D** de cerca de **TOTAL dos lados / COEFICIENTE**, com COEFICIENTE escolhido da seguinte lista {7, 6.75, 7.25, 6.25, 6.5, 7.5}.
- Depois, tracei um quadrado de lado **D**/4 e transformei-o num círculo esticando cada lado.
- Para terminar, com os retângulos restantes, utilizei o algoritmo **SA** para fazer o maior número de pequenos buracos.

Pontuação provisória do submit: 489 126,27 e final: **488 719,07**

Eis as minhas pontuações para as 10 primeiras grelhas:

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
