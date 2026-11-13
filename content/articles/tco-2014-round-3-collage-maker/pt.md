---
title: "TCO 2014 - Ronda 3 - CollageMaker"
slug: tco-2014-ronda-3-collage-maker
date: 2014-07-09
description: "Top Coder Open 2014 Ronda 3: o problema CollageMaker."
image: /articles/tco-2014-round-3-collage-maker/visualizer.png
---

_TopCoder TCO 2014 (09-07-2014)_

## Ronda 3: CollageMaker

O enunciado completo do problema proposto na última ronda do TCO está disponível [aqui][1].

Pequeno resumo do problema, temos:

- Um diretório que contém 1000 imagens em tons de cinza
- Para cada caso de teste, recebemos uma imagem-alvo com comprimento e largura máximos de 300 pixels e outras 200 imagens com comprimento e largura máximos de 100 pixels.

O objetivo do jogo é reconstituir a imagem-alvo com a ajuda das outras 200 imagens.

A pontuação é obtida calculando as diferenças de tons de cinza entre cada pixel.

É preciso implementar um método **compose** que recebe como parâmetro um array de inteiros **data**. O array é composto por 201 imagens descritas assim:

- um inteiro H para a altura da imagem
- um inteiro W para a largura da imagem
- e HxW inteiros correspondentes aos pixels da imagem (tons de cinza de 0 a 255)

As imagens não precisam de conservar a sua proporção comprimento / largura.

> **Observação:** as imagens não podem ser rodadas nem ter um comprimento ou uma largura maiores do que os fornecidos como parâmetro.

## Pontuação

No TopCoder, o sistema de pontuação é o seguinte:

- o resultado de cada caso de teste da solução é comparado com o melhor resultado desse caso de teste entre todos os participantes no momento do **submit** da solução no site.
- o primeiro do caso de teste recebe 10000 pontos e os outros uma pontuação proporcional
- a pontuação total é a soma das pontuações dos casos de teste normalizada pela pontuação do melhor

## Execução

Regras:

- Tempo limite: 10 segundos por caso de teste
- Memória: 1024MB
- Tamanho do código: 256KB
- Compilação: 60 segundos

O manual e um **JAR** executável de teste estão disponíveis no [site][2].

É possível até ver o [código-fonte][3] do visualizador, feito em java.

Eis o resultado do meu algoritmo para o caso de teste 1:

![Captura do visualizador](/articles/tco-2014-round-3-collage-maker/visualizer.png)

## Solução

- Primeiro, escolhi recortar a imagem-alvo utilizando a largura / comprimento mínimos disponíveis entre as 200 imagens fornecidas e utilizando um algoritmo **greedy** para posicioná-las.
- Depois, reduzi o tamanho das zonas para otimizar a pontuação.
- Para cada imagem, tentei então estendê-la em altura e em largura.
- Em seguida, ordeno as imagens por pontuação relativa decrescente e recorto as imagens com as pontuações mais altas em 4 subpartes (optei pelo extremamente simples; as melhores pontuações recortaram ou na largura ou no comprimento).
- Termino o processamento com um algoritmo **SA** (simulated annealing) para trocar as imagens entre si.

Pontuação provisória do submit: 809 648,79 e final: **807 646,95**

Eis as minhas pontuações para as 10 primeiras grelhas:

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

**Observação:** poder-se-ia pensar em análise de imagem, mas as melhores pontuações da maratona provam bem o contrário; eis uma captura do primeiro, **[ainu7][ainu7]**:

![ainu7-seed1](/articles/tco-2014-round-3-collage-maker/ainu7.png)

[1]: http://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=16012&pm=13246
[2]: http://community.topcoder.com/contest/problem/CollageMaker/manual.html
[3]: http://www.topcoder.com/contest/problem/CollageMaker/CollageMakerVis.java
[ainu7]: http://community.topcoder.com/tc?module=MemberProfile&cr=22653720
