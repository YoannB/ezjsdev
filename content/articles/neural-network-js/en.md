---
title: "A neural network in JavaScript, step by step"
slug: neural-network-in-javascript-step-by-step
date: 2026-11-25
description: "A neural network written in JavaScript, with no library: from the first neuron to a small framework, one step per Git tag."
---

[neural-network-js](https://github.com/YoannB/neural-network-js) is a neural network written in JavaScript for Node.js, with no machine learning library. It was built in steps in January 2026: first a single neuron, then a small framework that handles regression and binary classification, classifies images and chooses between several classes.

Before using a new concept, I like to understand how it works by rebuilding it myself. I had already tried the tools Google offers for neural networks; I wanted to see a simple version, as close as possible to the mathematics that make it work.

The code was written with AI assistance (ChatGPT). Each step is a Git tag: the history was rebuilt in November 2026, with Claude, from the successive versions of the project and at their original dates, and the README of each tag, written at that time, describes the step with run examples. To follow the project in order:

```sh
git clone https://github.com/YoannB/neural-network-js.git
cd neural-network-js
git checkout step-01-first-neuron
```

The READMEs and the code comments are in French. Node.js 18 or later is required.

| Tag                      | Date       | Step                                     |
| ------------------------ | ---------- | ---------------------------------------- |
| `step-01-first-neuron`   | January 8  | One neuron: y = w·x                      |
| `step-02-neuron-bias`    | January 8  | One neuron with a bias: y = w·x + b      |
| `step-03-neurons`        | January 8  | A 1-3-1 network and backpropagation      |
| `step-04-x-squared`      | January 14 | Approximating x²                         |
| `step-05-mini-framework` | January 16 | Mini-framework and binary classification |
| `step-06-images`         | January 17 | Image classification                     |
| `step-07-optimizers`     | January 22 | Adam and RMSprop optimizers              |
| `step-08-multiclass`     | January 27 | Multiclass classification                |

## Step 1: one neuron

The starting point fits in a few lines: a neuron with a single weight `w`, which must find the relation `y = 3x` from five examples. For each example, it compares its prediction with the expected value and corrects its weight in the direction that reduces the squared error. This is gradient descent in its simplest form.

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

After training (1,000 passes over the data by default, the "epochs"), the weight is 3.0000 and the neuron answers 30 for the input 10. Three scripts come with the neuron and stay until the end: `train` (train and save the model), `exec` (predict) and `reset` (start again from a random weight).

[Step 1 code](https://github.com/YoannB/neural-network-js/tree/step-01-first-neuron)

## Step 2: the bias

A single weight can only represent lines that go through the origin. So the neuron gets a bias `b`: `y = w·x + b`. The bias has its own gradient (`2 × error`), corrected at the same time as the weight. On the same data, training finds `w = 3` and `b = 0`.

[Step 2 code](https://github.com/YoannB/neural-network-js/tree/step-02-neuron-bias) · [what changes](https://github.com/YoannB/neural-network-js/compare/step-01-first-neuron...step-02-neuron-bias)

## Step 3: several neurons

The single neuron becomes a network: one input, a hidden layer of three neurons with the ReLU activation, one output neuron. The code is split into three classes, `Neuron`, `Layer` and `Network`, and backpropagation is written by hand: the output error is sent back to each hidden neuron, multiplied by the weight that links it to the output.

```js
this.output.backward([error]);
this.hidden.backward(
    this.output.neurons[0].weights.map(
        (w) => error * w
    )
);
```

The data is still `y = 3x`, a problem a single neuron already solved. The point of this step is the mechanics, which everything else builds on.

[Step 3 code](https://github.com/YoannB/neural-network-js/tree/step-03-neurons) · [what changes](https://github.com/YoannB/neural-network-js/compare/step-02-neuron-bias...step-03-neurons)

## Step 4: x²

A line is no longer enough: the network must approximate `y = x²` on the interval [0, 5], from 51 points. This is the step where most of the settings found in real libraries appear:

- a hidden layer of 12 neurons using the hyperbolic tangent (tanh) and a linear output;
- weights initialized at a scale that depends on the number of inputs;
- gradients clipped (limited to ±5) and a check for non-finite values, so that training does not diverge;
- normalized inputs and outputs, with the factors saved in the model;
- command-line options (`--epochs`, `--neurons`, `--lr`, `--noise`) and a `table` script that compares, point by point, the expected value and the predicted value.

With the model provided, the network answers for example 6.25 for 2.5 and 25.08 for 5.

[Step 4 code](https://github.com/YoannB/neural-network-js/tree/step-04-x-squared) · [what changes](https://github.com/YoannB/neural-network-js/compare/step-03-neurons...step-04-x-squared)

## Step 5: a mini-framework

The code is reorganized to serve several problems. The network (neuron, layer, network, activations) moves to `src/core/`, the datasets to `src/datasets/`, and the dataset is chosen by name on the command line. Inputs become vectors, with a dimension check.

Three datasets are provided:

- `square`: x², as in the previous step;
- `xor`: exclusive OR, the classic case a single neuron cannot solve;
- `primes`: is a number from 0 to 13, given in binary on 5 bits, prime?

The last two are binary classification problems: the output goes through a sigmoid, which gives a value between 0 and 1, and the error is measured with binary cross-entropy. The task type is saved in the model.

[Step 5 code](https://github.com/YoannB/neural-network-js/tree/step-05-mini-framework) · [what changes](https://github.com/YoannB/neural-network-js/compare/step-04-x-squared...step-05-mini-framework)

## Step 6: images

The same framework now classifies photos. The `images` dataset reads JPEG files, reduces them to 32 × 32 pixels in grayscale with the `sharp` library, and each image becomes a vector of 1,024 values between 0 and 1. The label comes from the file name: `_ok` or `_ko`. A script downloads orange photos from Pixabay; they still have to be labeled by hand.

On 100 orange photos, the network correctly classifies every training image. The README says so: this accuracy is measured on the learned images, not on new ones. On three photos outside the training set, the output is 0.99 for an orange, 0.77 for a clementine and 0.08 for an apricot.

[Step 6 code](https://github.com/YoannB/neural-network-js/tree/step-06-images) · [what changes](https://github.com/YoannB/neural-network-js/compare/step-05-mini-framework...step-06-images)

## Step 7: optimizers

Until then, each weight was corrected by plain gradient descent. Two other update methods are added, chosen with `--optimizer`:

- `rmsprop` divides the step by the moving average of the squared gradients;
- `adam`, the default, combines the moving averages of the gradient and of its square, with a bias correction at the start of training.

The README compares the three methods on XOR, over 2,000 epochs and with the same learning rate: the final error is about 0.53 with plain descent, 0.01 with Adam and 0.000006 with RMSprop.

The step also tidies up the project: each dataset has its own model in `models/<name>.json`, saving goes through `Network.toJSON()`, and a `linear` dataset (y = 2x − 1) joins the list.

[Step 7 code](https://github.com/YoannB/neural-network-js/tree/step-07-optimizers) · [what changes](https://github.com/YoannB/neural-network-js/compare/step-06-images...step-07-optimizers)

## Step 8: several classes

Last step: the network can have several outputs and choose one class among several. The output layer uses the softmax function, which turns the outputs into probabilities that add up to 1, and the error is measured with categorical cross-entropy. The error of each output is backpropagated to the hidden layer.

The example is rock-paper-scissors: for each move, the network must give the one that beats it. The problem is deliberately small; it is there to check the multi-output mechanics.

[Step 8 code](https://github.com/YoannB/neural-network-js/tree/step-08-multiclass) · [what changes](https://github.com/YoannB/neural-network-js/compare/step-07-optimizers...step-08-multiclass)

## What the project is not

It is a learning project, not a library for production use. The network has a single hidden layer, computations are done neuron by neuron, without matrix operations, and the project has no automated tests. It also improved from step to step: the early steps may contain mistakes that were fixed later. In return, every mechanism is visible, and each step fits in a few files that can be read in full.

The code is published under the MIT license: [github.com/YoannB/neural-network-js](https://github.com/YoannB/neural-network-js).
