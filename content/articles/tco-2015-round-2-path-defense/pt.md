---
title: "TCO 2015 - Rodada 2 - PathDefense"
slug: tco-2015-rodada-2-path-defense
date: 2015-07-20
description: "Top Coder Open 2015 Rodada 2: o problema PathDefense."
image: /articles/tco-2015-round-2-path-defense/pathdefense-seed1-init.png
---

_TopCoder TCO 2015 (25-05-2015)_

## Rodada 2: PathDefense

O enunciado completo do problema proposto na segunda rodada do TCO 2015 está disponível [aqui][1].

Pequeno resumo do problema, temos:

- Um plano de coordenadas x e y compreendidas entre 20 e 60 (limites incluídos) com bases e caminhos que levam às bases
- O dinheiro disponível no início, _money_ (inicializado com a soma dos diferentes valores das _towers_)
- A vida dos _bichos_, dada por _creepHealth_, indica a vida inicial de cada bicho; a cada 500 iterações (500,1000,1500) a vida dos bichos dobra.
- A quantia de dinheiro _creepMoney_ que se ganha depois de matar um bicho
- O número de tipos de torres de defesa disponíveis _towerType_ para matar os bichos
- Os bichos _creep_ com a sua posição e a vida restante
- a vida de cada uma das bases _baseHealth_

O objetivo do jogo é defender com **towers** as **bases**, que começam cada uma com 1000 pontos de vida e são atacadas pelos bichos **creep**, e maximizar o dinheiro final no caixa.

A pontuação é dada pelo dinheiro **money** (soma da vida restante de cada base com o dinheiro no caixa).

É preciso implementar um método **init** que recebe como parâmetros o plano _board_, o inteiro _money_, o inteiro _creepHealth_, o inteiro _creepMoney_ e o inteiro _towerType_.

- board: corresponde ao plano de coordenadas
- money: corresponde ao dinheiro inicial
- creepHealth: corresponde à vida inicial dos bichos
- creepMoney: corresponde ao dinheiro ganho depois de matar um bicho
- towerType: corresponde aos tipos de torres de defesa disponíveis

E um método **placeTowers** que será chamado _2000 vezes_ pelo visualizador e que recebe como parâmetros o array dos _creep_, o valor atual do caixa _money_ e a vida restante de cada base _baseHealth_.

- creep: corresponde às coordenadas dos bichos no plano
- money: corresponde ao dinheiro atualmente no caixa
- baseHealth: corresponde à vida atual das bases

> **Observação:** os _creep_ só se deslocam pelos caminhos que levam às bases (cada base pode ter de 0 a n caminhos que levam a ela).

> As _towers_ têm um perímetro de ataque, uma força e um custo. O perímetro de ataque **range** é definido assim: se a torre está em (X1,Y1) e o seu _range_ é R, o bicho em (X2,Y2) será atacado se e somente se `(X1-X2)*(X1-X2)+(Y1-Y2)*(Y1-Y2)<=R*R`.

## Pontuação

Este ano no TopCoder, o sistema de pontuação mudou e passou a ser o seguinte:

- o resultado de cada caso de teste da solução é comparado com os resultados desse caso de teste de todos os participantes no momento do **submit** da solução no site; se tiver mais, ganha 1 ponto, se as pontuações forem idênticas, 0.5 ponto, e caso contrário 0 ponto.
- a pontuação total é a soma das pontuações dos casos de teste normalizada pelo número de candidatos e multiplicada por 100000.

## Execução

Regras:

- Tempo limite: 20 segundos por caso de teste
- Memória: 1024MB
- Tamanho do código: 1MB
- Compilação: 60 segundos

O manual e um **JAR** executável de teste estão disponíveis no [site][2].

É possível até ver o [código-fonte][3] do visualizador, feito em java.

Eis o resultado do meu algoritmo para o caso de teste 1:

![Seed 1 init](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-init.png)

![Seed 1 first tower](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-firsttower.png)

![Seed 1 final](/articles/tco-2015-round-2-path-defense/pathdefense-seed1-final.png)

E para o caso de teste 2:

![Seed 2 init](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-init.png)

![Seed 2 first tower](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-firsttower.png)

![Seed 2 final](/articles/tco-2015-round-2-path-defense/pathdefense-seed2-final.png)

## Solução

- usei simplesmente o algoritmo A-star para simular o deslocamento dos bichos no plano
- e uma fórmula que leva em conta todos os parâmetros para determinar o número de torres a comprar
- posicionamento greedy das torres em função do seu poder de ataque
- inúmeras pequenas otimizações de código para os diferentes casos de teste

Pontuação provisória do submit: 597 041,42 e final: **564 610,95**

Eis as minhas pontuações para as 10 primeiras grades:

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
