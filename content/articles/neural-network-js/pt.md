---
title: "Uma rede neural em JavaScript, passo a passo"
slug: rede-neural-em-javascript-passo-a-passo
date: 2026-11-25
description: "Uma rede neural escrita em JavaScript, sem biblioteca: do primeiro neurónio a um pequeno framework, uma etapa por tag Git."
---

[neural-network-js](https://github.com/YoannB/neural-network-js) é uma rede neural escrita em JavaScript para Node.js, sem biblioteca de aprendizagem automática. Foi construída por etapas em janeiro de 2026: primeiro um único neurónio, depois um pequeno framework que faz regressão e classificação binária, classifica imagens e escolhe entre várias classes.

Antes de usar um conceito novo, gosto de perceber como funciona, refazendo-o eu próprio. Já tinha experimentado as ferramentas que a Google disponibiliza para as redes neurais; queria ver uma versão simples, o mais perto possível da matemática que a faz funcionar.

O código foi escrito com a assistência da IA (ChatGPT). Cada etapa corresponde a uma tag Git: o histórico foi reconstituído em novembro de 2026, com o Claude, a partir das versões sucessivas do projeto e nas suas datas originais, e o README de cada tag, redigido nessa altura, descreve a etapa com exemplos de execução. Para seguir o projeto por ordem:

```sh
git clone https://github.com/YoannB/neural-network-js.git
cd neural-network-js
git checkout step-01-first-neuron
```

Os README e os comentários do código estão em francês. É necessário o Node.js 18 ou superior.

| Tag                      | Data          | Etapa                                  |
| ------------------------ | ------------- | -------------------------------------- |
| `step-01-first-neuron`   | 8 de janeiro  | Um neurónio: y = w·x                   |
| `step-02-neuron-bias`    | 8 de janeiro  | Um neurónio com viés: y = w·x + b      |
| `step-03-neurons`        | 8 de janeiro  | Uma rede 1-3-1 e a retropropagação     |
| `step-04-x-squared`      | 14 de janeiro | Aproximação de x²                      |
| `step-05-mini-framework` | 16 de janeiro | Mini-framework e classificação binária |
| `step-06-images`         | 17 de janeiro | Classificação de imagens               |
| `step-07-optimizers`     | 22 de janeiro | Otimizadores Adam e RMSprop            |
| `step-08-multiclass`     | 27 de janeiro | Classificação multiclasse              |

## Etapa 1: um neurónio

O ponto de partida cabe em poucas linhas: um neurónio com um único peso `w`, que deve encontrar a relação `y = 3x` a partir de cinco exemplos. Em cada exemplo, compara a sua previsão com o valor esperado e corrige o peso no sentido que reduz o erro quadrático. É a descida do gradiente, na sua forma mais simples.

```js
train(x, yTrue) {
    const yPred = this.predict(x);
    const error = yPred - yTrue;

    // d(loss)/d(weight) = 2 * error * x
    const gradient = 2 * error * x;

    this.weight -= this.learningRate * gradient;

    return this.loss(yPred, yTrue);
}
```

Depois do treino (1000 passagens pelos dados por omissão, as «épocas»), o peso vale 3,0000 e o neurónio responde 30 para a entrada 10. Três scripts acompanham o neurónio e ficam até ao fim: `train` (treinar e guardar o modelo), `exec` (prever) e `reset` (recomeçar com um peso aleatório).

[Código da etapa 1](https://github.com/YoannB/neural-network-js/tree/step-01-first-neuron)

## Etapa 2: o viés

Um peso sozinho só representa retas que passam pela origem. Por isso, o neurónio recebe um viés `b`: `y = w·x + b`. O viés tem o seu próprio gradiente (`2 × erro`), corrigido ao mesmo tempo que o peso. Com os mesmos dados, o treino encontra `w = 3` e `b = 0`.

[Código da etapa 2](https://github.com/YoannB/neural-network-js/tree/step-02-neuron-bias) · [o que muda](https://github.com/YoannB/neural-network-js/compare/step-01-first-neuron...step-02-neuron-bias)

## Etapa 3: vários neurónios

O neurónio único passa a ser uma rede: uma entrada, uma camada oculta de três neurónios com a ativação ReLU e um neurónio de saída. O código divide-se em três classes, `Neuron`, `Layer` e `Network`, e a retropropagação é escrita à mão: o erro de saída é devolvido a cada neurónio oculto, multiplicado pelo peso que o liga à saída.

```js
this.output.backward([error]);
this.hidden.backward(
    this.output.neurons[0].weights.map(
        (w) => error * w
    )
);
```

Os dados continuam a ser `y = 3x`, um problema que um só neurónio já resolvia. O interesse da etapa é o mecanismo, sobre o qual assenta tudo o resto.

[Código da etapa 3](https://github.com/YoannB/neural-network-js/tree/step-03-neurons) · [o que muda](https://github.com/YoannB/neural-network-js/compare/step-02-neuron-bias...step-03-neurons)

## Etapa 4: x²

Uma reta já não chega: a rede tem de aproximar `y = x²` no intervalo [0, 5], a partir de 51 pontos. É a etapa em que aparecem a maior parte dos ajustes que se encontram nas verdadeiras bibliotecas:

- uma camada oculta de 12 neurónios com tangente hiperbólica (tanh) e uma saída linear;
- pesos inicializados a uma escala que depende do número de entradas;
- gradientes limitados (a ±5) e um controlo dos valores não finitos, para que o treino não divirja;
- entradas e saídas normalizadas, com os fatores guardados no modelo;
- opções de linha de comandos (`--epochs`, `--neurons`, `--lr`, `--noise`) e um script `table` que compara, ponto a ponto, o valor esperado e o valor previsto.

Com o modelo fornecido, a rede responde, por exemplo, 6,25 para 2,5 e 25,08 para 5.

[Código da etapa 4](https://github.com/YoannB/neural-network-js/tree/step-04-x-squared) · [o que muda](https://github.com/YoannB/neural-network-js/compare/step-03-neurons...step-04-x-squared)

## Etapa 5: um mini-framework

O código é reorganizado para servir vários problemas. A rede (neurónio, camada, rede, ativações) passa para `src/core/`, os conjuntos de dados para `src/datasets/`, e o conjunto de dados escolhe-se pelo nome na linha de comandos. As entradas passam a ser vetores, com um controlo das dimensões.

São fornecidos três conjuntos de dados:

- `square`: x², como na etapa anterior;
- `xor`: o OU exclusivo, o caso clássico que um neurónio sozinho não consegue resolver;
- `primes`: um número de 0 a 13, dado em binário com 5 bits, é primo?

Os dois últimos são problemas de classificação binária: a saída passa por uma sigmoide, que dá um valor entre 0 e 1, e o erro é medido com a entropia cruzada binária. O tipo de tarefa fica guardado no modelo.

[Código da etapa 5](https://github.com/YoannB/neural-network-js/tree/step-05-mini-framework) · [o que muda](https://github.com/YoannB/neural-network-js/compare/step-04-x-squared...step-05-mini-framework)

## Etapa 6: imagens

O mesmo framework classifica agora fotografias. O conjunto de dados `images` lê ficheiros JPEG, reduz-os a 32 × 32 píxeis em tons de cinzento com a biblioteca `sharp`, e cada imagem torna-se um vetor de 1024 valores entre 0 e 1. A etiqueta vem do nome do ficheiro: `_ok` ou `_ko`. Um script descarrega fotografias de laranjas do Pixabay; falta etiquetá-las à mão.

Com 100 fotografias de laranjas, a rede classifica corretamente todas as imagens de treino. O README di-lo claramente: esta exatidão é medida nas imagens aprendidas, não em imagens novas. Em três fotografias fora do treino, a saída vale 0,99 para uma laranja, 0,77 para uma clementina e 0,08 para um damasco.

[Código da etapa 6](https://github.com/YoannB/neural-network-js/tree/step-06-images) · [o que muda](https://github.com/YoannB/neural-network-js/compare/step-05-mini-framework...step-06-images)

## Etapa 7: os otimizadores

Até aqui, cada peso era corrigido por uma descida do gradiente simples. Juntam-se dois outros métodos de atualização, à escolha com `--optimizer`:

- `rmsprop` divide o passo pela média móvel do quadrado dos gradientes;
- `adam`, o método por omissão, combina as médias móveis do gradiente e do seu quadrado, com uma correção do viés no início do treino.

O README compara os três métodos no XOR, em 2000 épocas e com a mesma taxa de aprendizagem: o erro final é de cerca de 0,53 com a descida simples, 0,01 com Adam e 0,000006 com RMSprop.

A etapa também arruma o projeto: cada conjunto de dados tem o seu próprio modelo em `models/<nome>.json`, a gravação passa por `Network.toJSON()` e junta-se um conjunto de dados `linear` (y = 2x − 1).

[Código da etapa 7](https://github.com/YoannB/neural-network-js/tree/step-07-optimizers) · [o que muda](https://github.com/YoannB/neural-network-js/compare/step-06-images...step-07-optimizers)

## Etapa 8: várias classes

Última etapa: a rede pode ter várias saídas e escolher uma classe entre várias. A camada de saída usa a função softmax, que transforma as saídas em probabilidades cuja soma é 1, e o erro é medido com a entropia cruzada categórica. O erro de cada saída é retropropagado para a camada oculta.

O exemplo é pedra-papel-tesoura: para cada jogada, a rede tem de indicar a que a vence. O problema é pequeno de propósito: serve para verificar o mecanismo com várias saídas.

[Código da etapa 8](https://github.com/YoannB/neural-network-js/tree/step-08-multiclass) · [o que muda](https://github.com/YoannB/neural-network-js/compare/step-07-optimizers...step-08-multiclass)

## O que o projeto não é

É um projeto de aprendizagem, não uma biblioteca para usar em produção. A rede tem uma única camada oculta, os cálculos fazem-se neurónio a neurónio, sem cálculo matricial, e o projeto não tem testes automatizados. Além disso, foi melhorando de etapa em etapa: as primeiras etapas podem conter erros, corrigidos depois. Em troca, cada mecanismo é visível e cada etapa cabe em poucos ficheiros que se podem ler por inteiro.

O código está publicado sob a licença MIT: [github.com/YoannB/neural-network-js](https://github.com/YoannB/neural-network-js).
