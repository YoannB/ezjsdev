---
title: "TCO 2015 - Rodada 3 - PegJump"
slug: tco-2015-rodada-3-peg-jump
date: 2015-07-22
description: "Top Coder Open 2015 Rodada 3: o problema PegJump."
image: /articles/tco-2015-round-3-peg-jump/pegjump-seed1-init.png
---

_TopCoder TCO 2015 (22-06-2015)_

## Rodada 3: PegJump

> Uma variante do RESTA UM

O enunciado completo do problema proposto na terceira rodada do TCO 2015 está disponível [aqui][1].

Pequeno resumo do problema, temos:

- Um plano de coordenadas x e y compreendidas entre 20 e 60, que contém a posição dos **peg**.
- E uma lista de inteiros correspondentes aos valores dos **peg**.

Como no resta um, o objetivo do jogo é fazer saltos de **peg** para _comer_ os outros, mas com o objetivo principal de fazer _cadeias_ de saltos de **pegs**.

A fórmula de cálculo da pontuação é **número de saltos de peg x soma dos valores dos peg comidos**.

É preciso implementar um método **getMoves** que recebe como parâmetros um array de inteiros **pegValue** e um array de strings **board**.

- pegValue: corresponde aos valores de cada tipo de **peg**
- board: corresponde ao plano e contém os **peg** com o seu tipo

O método **getMoves** deve retornar a lista de saltos de **peg**, partindo das coordenadas x e y do **peg** que deve saltar e da direção do salto: Up, Down, Left, Right. Quando se encadeiam saltos, basta concatenar as direções umas atrás das outras:

- exemplo de um salto simples: "1 5 U"
- exemplo de um _grande_ salto: "1 5 UDLRUDLLR"

## Pontuação

Este ano no TopCoder, o sistema de pontuação mudou e passou a ser o seguinte:

- o resultado de cada caso de teste da solução é comparado com os resultados desse caso de teste de todos os participantes no momento do **submit** da solução no site; se tiver mais, ganha 1 ponto, se as pontuações forem idênticas, 0.5 ponto, e caso contrário 0 ponto.
- a pontuação total é a soma das pontuações dos casos de teste normalizada pelo número de candidatos

## Execução

Regras:

- Tempo limite: 15 segundos por caso de teste
- Memória: 1024MB
- Tamanho do código: 1MB
- Compilação: 30 segundos

O manual e um **JAR** executável de teste estão disponíveis no [site][2].

É possível até ver o [código-fonte][3] do visualizador, feito em java.

Eis o resultado do meu algoritmo para o caso de teste 1:

![Exemplo seed 1 init](/articles/tco-2015-round-3-peg-jump/pegjump-seed1-init.png)

![Exemplo seed 1 final](/articles/tco-2015-round-3-peg-jump/pegjump-seed1-final.png)

## Solução

- Muito longe das pontuações dos primeiros, não me preocupei o suficiente com os saltos encadeados por uma única peça...
- Teste de vários algoritmos: a busca em profundidade DFS (Depth First Search), Beam Search ...
- Divisão das grades grandes em 2, 4, 9 ou 16 partes para processá-las mais depressa
- Uso de um Beam para simplificar as grades antes de processá-las (percorrer todas as células de 4 em 4 e fazer saltos enquanto houver 4 células com _peg_)
- Encontrar a melhor sequência de saltos e depois tentar melhorá-la

Pontuação provisória do submit: 98 869,77 e final: **110 956,41**

Eis as minhas pontuações para as 10 primeiras grades:

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
