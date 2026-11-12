---
title: "TCO 2015 - Rodada 1 - SmallPolygons"
slug: tco-2015-rodada-1-small-polygons
date: 2015-06-20
description: "Top Coder Open 2015 Rodada 1: o problema SmallPolygons."
image: /articles/tco-2015-round-1-small-polygons/seed-5-np-1368-n-6-polygonization-180sec.png
---

_TopCoder TCO 2015 (20-04-2015)_

## Rodada 1: SmallPolygons

O enunciado completo do problema proposto na primeira rodada do TCO 2015 está disponível [aqui][1].

Pequeno resumo do problema, temos:

- Um plano de coordenadas x e y compreendidas entre 0 e 699
- Uma lista de pontos no plano.
- E um número máximo de polígonos a construir

O objetivo do jogo é formar polígonos com os pontos sem ultrapassar o número de polígonos dado e minimizando a área dos polígonos assim criados.

A fórmula de cálculo da pontuação é **soma das áreas dos polígonos**.

É preciso implementar um método **choosePolygons** que recebe como parâmetros o array de inteiros **points** e um inteiro **N**.

- points: corresponde à lista de pontos
- N: corresponde ao máximo de polígonos

O método **choosePolygons** deve retornar cada polígono, na forma de um array dos índices dos pontos que devem formar um polígono.

> a ordem dos pontos da lista deve ser conservada para permitir identificar cada ponto mais adiante

## Pontuação

Este ano no TopCoder, o sistema de pontuação mudou e passou a ser o seguinte:

- o resultado de cada caso de teste da solução é comparado com os resultados desse caso de teste de todos os participantes no momento do **submit** da solução no site; se tiver mais, ganha 1 ponto, se as pontuações forem idênticas, 0.5 ponto, e caso contrário 0 ponto.
- a pontuação total é a soma das pontuações dos casos de teste normalizada pelo número de candidatos

## Execução

Regras:

- Tempo limite: 10 segundos por caso de teste
- Memória: 1024MB
- Tamanho do código: 1MB
- Compilação: 30 segundos

O manual e um **JAR** executável de teste estão disponíveis no [site][2].

É possível até ver o [código-fonte][3] do visualizador, feito em java.

Eis o resultado do meu algoritmo para alguns casos de teste:

![Captura seed 1](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed1.png)

![Captura seed 2](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed2.png)

![Captura seed 5](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed5-saone.png)

## Solução

> Deixei passar uma coisa, a "polygonization", o algoritmo que permitia construir um polígono simples "rapidamente" (em vez disso usei uma ordenação polar dos pontos -> o que dá uma estrela mais difícil de otimizar e de recortar depois...)

![Captura seed 5 sortclockwise](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed5-sortclockwise.png)

> **polygonization**:
>
> 1. cálculo do triângulo de área mínima na lista de pontos (são os 3 primeiros pontos ordenados)
> 2. para cada "vértice" (lado do polígono formado pelos pontos i e i + 1), cálculo do ponto médio do vértice e, entre todos os pontos restantes, guarda-se o mais próximo de um vértice
> 3. adição do ponto entre os 2 pontos do vértice do polígono
> 4. repetir 2 e 3 até que todos os pontos tenham sido usados

Seed 5 com **polygonization**:

![Captura seed 5 polygonization](/articles/tco-2015-round-1-small-polygons/seed-5-np-1368-n-6-polygonization-180sec.png)

E a minha solução:

- ordenação polar dos pontos para obter polígonos válidos (obtenção de uma solução mínima)

    ![Captura seed 3 sortClockWise](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3-sortclockwise.png)

- uso do algoritmo K-Means para repartir os pontos em N listas de pontos e depois reordenação dos pontos com a ordenação polar

    ![Captura seed 3 k-means](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3-kmeans.png)

- otimização dos polígonos com um algoritmo SA (trocando pontos entre os polígonos)

    ![Captura seed 3](/articles/tco-2015-round-1-small-polygons/smallpolygons-seed3.png)

> para as grades _pequenas_, uso de um algoritmo Beam Search para encontrar _a_ melhor solução...

Pontuação provisória do submit: 69,40 e final: **1 382,88**

Melhor classificação no TCO: [46.º][4] e código-fonte da solução [aqui][5].

Eis as minhas pontuações para as 10 primeiras grades:

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
