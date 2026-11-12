---
title: "TCO 2014 - Rodada 1 - SquareRemover"
slug: tco-2014-rodada-1-square-remover
date: 2014-04-24
description: "Top Coder Open 2014 Rodada 1: o problema SquareRemover."
image: /articles/tco-2014-round-1-square-remover/visualizer.png
---

_TopCoder TCO 2014 (24-04-2014)_

## Rodada 1: SquareRemover

O enunciado completo do problema proposto este ano na primeira rodada do TCO está disponível [aqui][1].

Pequeno resumo do problema, temos:

- Uma grade NxN (8<=N<=16) em que cada célula é colorida com uma das cores (4<=cores<=6)
- Um buffer de zonas seguintes; cada zona é composta por 4 células.

O objetivo do jogo é reunir de 4 em 4 as células da mesma cor, que são destruídas e depois substituídas pela zona seguinte do buffer.

Cada zona de 4 células destruída vale **1 ponto**.

É preciso implementar um método **playIt** que recebe como parâmetros um inteiro **colors**, um array de strings **board** e um inteiro **startSeed**.

- colors: corresponde ao número de cores possíveis da grade
- board: representa a grade na forma ["0123","2031","0221","3201"]
- startSeed: é o inteiro que permite gerar a nova zona

    ```
    A[0] = startSeed
    A[i] = (A[i-1] * 48271) MOD 2147483647
    ```

O método **playIt** deve retornar 10000 movimentos, ou seja, um array de 30000 inteiros:

- 3\*i: linha da célula a mover
- 3\*i+1: coluna da célula a mover
- 3\*i+2: direção na qual mover a célula (0 - up, 1 - right, 2 - down, 3 - left)

Um movimento consiste em trocar a cor da célula a mover com a da célula situada nessa direção.

## Pontuação

No TopCoder, o sistema de pontuação é o seguinte:

- o resultado de cada caso de teste da solução é comparado com o melhor resultado desse caso de teste entre todos os participantes no momento do **submit** da solução no site.
- o primeiro do caso de teste recebe 10000 pontos e os outros uma pontuação proporcional
- a pontuação total é a soma das pontuações dos casos de teste normalizada pela pontuação do melhor

## Execução

Regras:

- Tempo limite: 30 segundos por caso de teste
- Memória: 1024MB
- Tamanho do código: 1MB
- Compilação: 60 segundos

O manual e um **JAR** executável de teste estão disponíveis no [site][2].

É possível até ver o [código-fonte][3] do visualizador, feito em java.

![Captura do visualizador](/articles/tco-2014-round-1-square-remover/visualizer.png)

O objetivo do jogo é reunir as cores de 4 em 4:

![Exemplo de um movimento normal](/articles/tco-2014-round-1-square-remover/move-1.png)

É possível fazer combinações num único movimento e assim acumular pontos:

![Exemplo de um movimento duplo](/articles/tco-2014-round-1-square-remover/move-2.png)

## Solução

Como não tive muito tempo e não sou um especialista (apenas 4/5 maratonas no último ano) em comparação com a maioria dos participantes, que também fazem partidas cronometradas de 8 h o ano todo e a maioria das maratonas, minha pontuação final está longe de ser a melhor, mas o algoritmo da minha solução é o que todas as melhores pontuações usaram, por isso tomo a liberdade de apresentá-lo aqui com um pouco mais de detalhe.

Este algoritmo é o [**Beam Search**][4] ([Algorithme de recherche en faisceau][5] em francês).

O princípio é jogar todas as jogadas de uma iteração e conservar, entre as melhores soluções, um número de soluções chamado **WIDTH**. Depois, para cada uma dessas soluções, todas as jogadas são relançadas e conservam-se novamente as **WIDTH** melhores.

A grande dificuldade para aplicar o algoritmo a este problema é a viabilidade matemática dado o número de soluções possíveis: (16 \* 16 \* 4) ^ 10000 -> infinito

Portanto, é necessário limitar o número de pontos a jogar em cada iteração e também limitar a **WIDTH** do algoritmo.

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
			if (p2 > -1/**ponto válido**/) {
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
					if (p2 > -1/**ponto válido**/) {
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

Para escolher os melhores pontos a mover, decidi pegar os pontos mais próximos de uma zona de 3 células da mesma cor e depois, se não houvesse, considerei em pares as células mais próximas de uma zona de 2 células da mesma cor.

Pontuação provisória do submit: 446164,62 e final: **418829,75**

Eis as minhas pontuações para as 10 primeiras grades:

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

O primeiro tem aproximadamente o dobro em cada pontuação!!!

**Observação:** Pena, minhas pontuações eram melhores, mas eu tinha um pequeno erro no código final que fez muitos casos de teste falharem; da próxima vez, espero ser mais atento.

[1]: http://community.topcoder.com/longcontest/?module=ViewProblemStatement&rd=15938&pm=13132
[2]: http://www.topcoder.com/contest/problem/SquareRemover/manual.html
[3]: http://www.topcoder.com/contest/problem/SquareRemover/SquareRemoverVis.java
[4]: http://en.wikipedia.org/wiki/Beam_search
[5]: http://fr.wikipedia.org/wiki/Algorithme_de_recherche_en_faisceau
