---
title: "Una red neuronal en JavaScript, paso a paso"
slug: red-neuronal-en-javascript-paso-a-paso
date: 2026-11-25
description: "Una red neuronal escrita en JavaScript, sin biblioteca: de la primera neurona a un pequeño framework, una etapa por tag de Git."
---

[neural-network-js](https://github.com/YoannB/neural-network-js) es una red neuronal escrita en JavaScript para Node.js, sin biblioteca de aprendizaje automático. Se construyó por etapas en enero de 2026: primero una sola neurona, luego un pequeño framework que hace regresión y clasificación binaria, clasifica imágenes y elige entre varias clases.

Antes de usar un concepto nuevo, me gusta entender cómo funciona rehaciéndolo yo mismo. Ya había probado las herramientas que ofrece Google para las redes neuronales; quería ver una versión sencilla, lo más cerca posible de las matemáticas que la hacen funcionar.

El código se escribió con la asistencia de la IA (ChatGPT). Cada etapa corresponde a un tag de Git: el historial se reconstruyó en noviembre de 2026, con Claude, a partir de las versiones sucesivas del proyecto y en sus fechas originales, y el README de cada tag, redactado en ese momento, describe la etapa con ejemplos de ejecución. Para seguir el proyecto en orden:

```sh
git clone https://github.com/YoannB/neural-network-js.git
cd neural-network-js
git checkout step-01-first-neuron
```

Los README y los comentarios del código están en francés. Se necesita Node.js 18 o superior.

| Tag                      | Fecha       | Etapa                                  |
| ------------------------ | ----------- | -------------------------------------- |
| `step-01-first-neuron`   | 8 de enero  | Una neurona: y = w·x                   |
| `step-02-neuron-bias`    | 8 de enero  | Una neurona con sesgo: y = w·x + b     |
| `step-03-neurons`        | 8 de enero  | Una red 1-3-1 y la retropropagación    |
| `step-04-x-squared`      | 14 de enero | Aproximación de x²                     |
| `step-05-mini-framework` | 16 de enero | Mini-framework y clasificación binaria |
| `step-06-images`         | 17 de enero | Clasificación de imágenes              |
| `step-07-optimizers`     | 22 de enero | Optimizadores Adam y RMSprop           |
| `step-08-multiclass`     | 27 de enero | Clasificación multiclase               |

## Etapa 1: una neurona

El punto de partida cabe en pocas líneas: una neurona con un solo peso `w`, que debe encontrar la relación `y = 3x` a partir de cinco ejemplos. En cada ejemplo, compara su predicción con el valor esperado y corrige su peso en la dirección que reduce el error cuadrático. Es el descenso de gradiente, en su forma más simple.

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

Tras el entrenamiento (1000 pasadas sobre los datos por defecto, las «épocas»), el peso vale 3,0000 y la neurona responde 30 para la entrada 10. Tres scripts acompañan a la neurona y se mantienen hasta el final: `train` (entrenar y guardar el modelo), `exec` (predecir) y `reset` (volver a un peso aleatorio).

[Código de la etapa 1](https://github.com/YoannB/neural-network-js/tree/step-01-first-neuron)

## Etapa 2: el sesgo

Un peso solo representa rectas que pasan por el origen. Por eso la neurona recibe un sesgo `b`: `y = w·x + b`. El sesgo tiene su propio gradiente (`2 × error`), corregido al mismo tiempo que el peso. Con los mismos datos, el entrenamiento encuentra `w = 3` y `b = 0`.

[Código de la etapa 2](https://github.com/YoannB/neural-network-js/tree/step-02-neuron-bias) · [qué cambia](https://github.com/YoannB/neural-network-js/compare/step-01-first-neuron...step-02-neuron-bias)

## Etapa 3: varias neuronas

La neurona única se convierte en una red: una entrada, una capa oculta de tres neuronas con la activación ReLU y una neurona de salida. El código se divide en tres clases, `Neuron`, `Layer` y `Network`, y la retropropagación está escrita a mano: el error de salida se envía a cada neurona oculta, multiplicado por el peso que la une a la salida.

```js
this.output.backward([error]);
this.hidden.backward(
    this.output.neurons[0].weights.map(
        (w) => error * w
    )
);
```

Los datos siguen siendo `y = 3x`, un problema que una sola neurona ya resolvía. El interés de la etapa es el mecanismo, sobre el que se construye todo lo demás.

[Código de la etapa 3](https://github.com/YoannB/neural-network-js/tree/step-03-neurons) · [qué cambia](https://github.com/YoannB/neural-network-js/compare/step-02-neuron-bias...step-03-neurons)

## Etapa 4: x²

Una recta ya no basta: la red debe aproximar `y = x²` en el intervalo [0, 5], a partir de 51 puntos. Es la etapa en la que aparecen la mayoría de los ajustes que se encuentran en las bibliotecas reales:

- una capa oculta de 12 neuronas con tangente hiperbólica (tanh) y una salida lineal;
- pesos inicializados a una escala que depende del número de entradas;
- gradientes recortados (limitados a ±5) y un control de los valores no finitos, para que el entrenamiento no diverja;
- entradas y salidas normalizadas, con los factores guardados en el modelo;
- opciones de línea de comandos (`--epochs`, `--neurons`, `--lr`, `--noise`) y un script `table` que compara, punto por punto, el valor esperado y el valor predicho.

Con el modelo incluido, la red responde por ejemplo 6,25 para 2,5 y 25,08 para 5.

[Código de la etapa 4](https://github.com/YoannB/neural-network-js/tree/step-04-x-squared) · [qué cambia](https://github.com/YoannB/neural-network-js/compare/step-03-neurons...step-04-x-squared)

## Etapa 5: un mini-framework

El código se reorganiza para servir a varios problemas. La red (neurona, capa, red, activaciones) pasa a `src/core/`, los conjuntos de datos a `src/datasets/`, y el conjunto de datos se elige por su nombre en la línea de comandos. Las entradas pasan a ser vectores, con un control de dimensiones.

Se incluyen tres conjuntos de datos:

- `square`: x², como en la etapa anterior;
- `xor`: el O exclusivo, el caso clásico que una sola neurona no sabe resolver;
- `primes`: ¿es primo un número de 0 a 13, dado en binario con 5 bits?

Los dos últimos son problemas de clasificación binaria: la salida pasa por una sigmoide, que da un valor entre 0 y 1, y el error se mide con la entropía cruzada binaria. El tipo de tarea se guarda en el modelo.

[Código de la etapa 5](https://github.com/YoannB/neural-network-js/tree/step-05-mini-framework) · [qué cambia](https://github.com/YoannB/neural-network-js/compare/step-04-x-squared...step-05-mini-framework)

## Etapa 6: imágenes

El mismo framework clasifica ahora fotos. El conjunto de datos `images` lee archivos JPEG, los reduce a 32 × 32 píxeles en escala de grises con la biblioteca `sharp`, y cada imagen se convierte en un vector de 1024 valores entre 0 y 1. La etiqueta viene del nombre del archivo: `_ok` o `_ko`. Un script descarga fotos de naranjas desde Pixabay; queda etiquetarlas a mano.

Con 100 fotos de naranjas, la red clasifica correctamente todas las imágenes de entrenamiento. El README lo precisa: esta precisión se mide sobre las imágenes aprendidas, no sobre imágenes nuevas. Con tres fotos fuera del entrenamiento, la salida vale 0,99 para una naranja, 0,77 para una clementina y 0,08 para un albaricoque.

[Código de la etapa 6](https://github.com/YoannB/neural-network-js/tree/step-06-images) · [qué cambia](https://github.com/YoannB/neural-network-js/compare/step-05-mini-framework...step-06-images)

## Etapa 7: los optimizadores

Hasta entonces, cada peso se corregía con un descenso de gradiente simple. Se añaden otros dos métodos de actualización, a elegir con `--optimizer`:

- `rmsprop` divide el paso por la media móvil del cuadrado de los gradientes;
- `adam`, el método por defecto, combina las medias móviles del gradiente y de su cuadrado, con una corrección del sesgo al inicio del entrenamiento.

El README compara los tres métodos con XOR, en 2000 épocas y con la misma tasa de aprendizaje: el error final es de unos 0,53 con el descenso simple, 0,01 con Adam y 0,000006 con RMSprop.

La etapa también ordena el proyecto: cada conjunto de datos tiene su propio modelo en `models/<nombre>.json`, el guardado pasa por `Network.toJSON()` y se añade un conjunto de datos `linear` (y = 2x − 1).

[Código de la etapa 7](https://github.com/YoannB/neural-network-js/tree/step-07-optimizers) · [qué cambia](https://github.com/YoannB/neural-network-js/compare/step-06-images...step-07-optimizers)

## Etapa 8: varias clases

Última etapa: la red puede tener varias salidas y elegir una clase entre varias. La capa de salida usa la función softmax, que convierte las salidas en probabilidades cuya suma vale 1, y el error se mide con la entropía cruzada categórica. El error de cada salida se retropropaga hacia la capa oculta.

El ejemplo es piedra, papel o tijera: para cada jugada, la red debe dar la que la vence. El problema es pequeño a propósito: sirve para comprobar el mecanismo con varias salidas.

[Código de la etapa 8](https://github.com/YoannB/neural-network-js/tree/step-08-multiclass) · [qué cambia](https://github.com/YoannB/neural-network-js/compare/step-07-optimizers...step-08-multiclass)

## Lo que el proyecto no es

Es un proyecto de aprendizaje, no una biblioteca para producción. La red tiene una sola capa oculta, los cálculos se hacen neurona por neurona, sin cálculo matricial, y el proyecto no tiene pruebas automatizadas. Además, mejoró de etapa en etapa: las primeras etapas pueden contener errores, corregidos después. A cambio, cada mecanismo es visible y cada etapa cabe en unos pocos archivos que se pueden leer enteros.

El código se publica con licencia MIT: [github.com/YoannB/neural-network-js](https://github.com/YoannB/neural-network-js).
