---
title: "Un réseau de neurones en JavaScript, pas à pas"
slug: reseau-de-neurones-en-javascript-pas-a-pas
date: 2026-11-25
description: "Un réseau de neurones écrit en JavaScript, sans bibliothèque : du premier neurone à un petit framework, une étape par tag Git."
---

[neural-network-js](https://github.com/YoannB/neural-network-js) est un réseau de neurones écrit en JavaScript pour Node.js, sans bibliothèque d'apprentissage automatique. Il a été construit par étapes en janvier 2026 : d'abord un neurone unique, puis un petit framework qui sait faire de la régression, de la classification binaire, classer des images et choisir entre plusieurs classes.

Avant de me servir d'un nouveau concept, j'aime comprendre comment il fonctionne en le refaisant moi-même. J'avais déjà essayé les outils proposés par Google pour les réseaux de neurones ; je voulais en voir une version simple, au plus près des mathématiques qui la font fonctionner.

Le code a été écrit avec l'assistance de l'IA (ChatGPT). Chaque étape correspond à un tag Git : l'historique a été reconstitué en novembre 2026, avec Claude, à partir des versions successives du projet et à leurs dates d'origine, et le README de chaque tag, rédigé à ce moment-là, décrit l'étape avec des exemples d'exécution. Pour suivre le projet dans l'ordre :

```sh
git clone https://github.com/YoannB/neural-network-js.git
cd neural-network-js
git checkout step-01-first-neuron
```

Les README et les commentaires du code sont en français. Il faut Node.js 18 ou plus.

| Tag                      | Date       | Étape                                    |
| ------------------------ | ---------- | ---------------------------------------- |
| `step-01-first-neuron`   | 8 janvier  | Un neurone : y = w·x                     |
| `step-02-neuron-bias`    | 8 janvier  | Un neurone avec biais : y = w·x + b      |
| `step-03-neurons`        | 8 janvier  | Un réseau 1-3-1 et la rétropropagation   |
| `step-04-x-squared`      | 14 janvier | Approximation de x²                      |
| `step-05-mini-framework` | 16 janvier | Mini-framework et classification binaire |
| `step-06-images`         | 17 janvier | Classification d'images                  |
| `step-07-optimizers`     | 22 janvier | Optimiseurs Adam et RMSprop              |
| `step-08-multiclass`     | 27 janvier | Classification multiclasse               |

## Étape 1 : un neurone

Le point de départ tient en quelques lignes : un neurone avec un seul poids `w`, qui doit retrouver la relation `y = 3x` à partir de cinq exemples. À chaque exemple, il compare sa prédiction à la valeur attendue et corrige son poids dans le sens qui réduit l'erreur quadratique. C'est la descente de gradient, sous sa forme la plus simple.

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

Après l'entraînement (1 000 passages sur les données par défaut, les « époques »), le poids vaut 3,0000 et le neurone répond 30 pour l'entrée 10. Trois scripts accompagnent le neurone et resteront jusqu'au bout : `train` (entraîner et sauvegarder le modèle), `exec` (prédire) et `reset` (repartir d'un poids aléatoire).

[Code de l'étape 1](https://github.com/YoannB/neural-network-js/tree/step-01-first-neuron)

## Étape 2 : le biais

Un poids seul ne représente que des droites qui passent par l'origine. Le neurone reçoit donc un biais `b` : `y = w·x + b`. Le biais a son propre gradient (`2 × erreur`), corrigé en même temps que le poids. Sur les mêmes données, l'entraînement retrouve `w = 3` et `b = 0`.

[Code de l'étape 2](https://github.com/YoannB/neural-network-js/tree/step-02-neuron-bias) · [ce qui change](https://github.com/YoannB/neural-network-js/compare/step-01-first-neuron...step-02-neuron-bias)

## Étape 3 : plusieurs neurones

Le neurone unique devient un réseau : une entrée, une couche cachée de trois neurones avec l'activation ReLU, un neurone de sortie. Le code se découpe en trois classes, `Neuron`, `Layer` et `Network`, et la rétropropagation est écrite à la main : l'erreur de sortie est renvoyée vers chaque neurone caché, multipliée par le poids qui le relie à la sortie.

```js
this.output.backward([error]);
this.hidden.backward(
    this.output.neurons[0].weights.map(
        (w) => error * w
    )
);
```

Les données restent `y = 3x`, un problème qu'un seul neurone résolvait déjà. L'intérêt de l'étape est la mécanique, qui servira ensuite à tout le reste.

[Code de l'étape 3](https://github.com/YoannB/neural-network-js/tree/step-03-neurons) · [ce qui change](https://github.com/YoannB/neural-network-js/compare/step-02-neuron-bias...step-03-neurons)

## Étape 4 : x²

Une droite ne suffit plus : le réseau doit approcher `y = x²` sur l'intervalle [0, 5], à partir de 51 points. C'est l'étape où apparaissent la plupart des réglages qu'on retrouve dans les vraies bibliothèques :

- une couche cachée de 12 neurones en tangente hyperbolique (tanh) et une sortie linéaire ;
- des poids initialisés à une échelle qui dépend du nombre d'entrées ;
- des gradients écrêtés (limités à ±5) et un contrôle des valeurs non finies, pour que l'entraînement ne diverge pas ;
- des entrées et des sorties normalisées, avec les facteurs sauvegardés dans le modèle ;
- des options en ligne de commande (`--epochs`, `--neurons`, `--lr`, `--noise`) et un script `table` qui compare, point par point, la valeur attendue et la valeur prédite.

Avec le modèle fourni, le réseau répond par exemple 6,25 pour 2,5 et 25,08 pour 5.

[Code de l'étape 4](https://github.com/YoannB/neural-network-js/tree/step-04-x-squared) · [ce qui change](https://github.com/YoannB/neural-network-js/compare/step-03-neurons...step-04-x-squared)

## Étape 5 : un mini-framework

Le code est réorganisé pour servir à plusieurs problèmes. Le réseau (neurone, couche, réseau, activations) passe dans `src/core/`, les jeux de données dans `src/datasets/`, et on choisit le jeu de données par son nom en ligne de commande. Les entrées deviennent des vecteurs, avec un contrôle des dimensions.

Trois jeux de données sont fournis :

- `square` : x², comme à l'étape précédente ;
- `xor` : le OU exclusif, le cas classique qu'un neurone seul ne sait pas résoudre ;
- `primes` : un nombre de 0 à 13, donné en binaire sur 5 bits, est-il premier ?

Les deux derniers sont des problèmes de classification binaire : la sortie passe par une sigmoïde, qui donne une valeur entre 0 et 1, et l'erreur est mesurée par l'entropie croisée binaire. Le type de tâche est enregistré dans le modèle.

[Code de l'étape 5](https://github.com/YoannB/neural-network-js/tree/step-05-mini-framework) · [ce qui change](https://github.com/YoannB/neural-network-js/compare/step-04-x-squared...step-05-mini-framework)

## Étape 6 : des images

Le même framework classe maintenant des photos. Le jeu de données `images` lit des fichiers JPEG, les réduit en 32 × 32 pixels en niveaux de gris avec la bibliothèque `sharp`, et chaque image devient un vecteur de 1 024 valeurs entre 0 et 1. L'étiquette vient du nom du fichier : `_ok` ou `_ko`. Un script télécharge des photos d'oranges depuis Pixabay ; il reste à les étiqueter à la main.

Sur 100 photos d'oranges, le réseau classe correctement toutes les images d'entraînement. Le README le précise : cette précision est mesurée sur les images apprises, pas sur des images nouvelles. Sur trois photos hors entraînement, la sortie vaut 0,99 pour une orange, 0,77 pour une clémentine et 0,08 pour un abricot.

[Code de l'étape 6](https://github.com/YoannB/neural-network-js/tree/step-06-images) · [ce qui change](https://github.com/YoannB/neural-network-js/compare/step-05-mini-framework...step-06-images)

## Étape 7 : les optimiseurs

Jusque-là, chaque poids était corrigé par une descente de gradient simple. Deux autres méthodes de mise à jour s'y ajoutent, au choix avec `--optimizer` :

- `rmsprop` divise le pas par la moyenne glissante du carré des gradients ;
- `adam`, utilisé par défaut, combine les moyennes glissantes du gradient et de son carré, avec une correction du biais en début d'entraînement.

Le README compare les trois méthodes sur XOR, en 2 000 époques et avec le même taux d'apprentissage : l'erreur finale est d'environ 0,53 avec la descente simple, 0,01 avec Adam et 0,000006 avec RMSprop.

L'étape range aussi le projet : chaque jeu de données a son propre modèle dans `models/<nom>.json`, la sauvegarde passe par `Network.toJSON()`, et un jeu de données `linear` (y = 2x − 1) s'ajoute à la liste.

[Code de l'étape 7](https://github.com/YoannB/neural-network-js/tree/step-07-optimizers) · [ce qui change](https://github.com/YoannB/neural-network-js/compare/step-06-images...step-07-optimizers)

## Étape 8 : plusieurs classes

Dernière étape : le réseau peut avoir plusieurs sorties et choisir une classe parmi plusieurs. La couche de sortie utilise la fonction softmax, qui transforme les sorties en probabilités dont la somme vaut 1, et l'erreur est mesurée par l'entropie croisée catégorielle. L'erreur de chaque sortie est rétropropagée vers la couche cachée.

L'exemple est pierre-feuille-ciseaux : pour chaque coup, le réseau doit donner celui qui le bat. Le problème est volontairement petit, il sert à vérifier la mécanique à plusieurs sorties.

[Code de l'étape 8](https://github.com/YoannB/neural-network-js/tree/step-08-multiclass) · [ce qui change](https://github.com/YoannB/neural-network-js/compare/step-07-optimizers...step-08-multiclass)

## Ce que le projet n'est pas

C'est un projet d'apprentissage, pas une bibliothèque à utiliser en production. Le réseau a une seule couche cachée, les calculs se font neurone par neurone, sans calcul matriciel, et le projet n'a pas de tests automatisés. Il s'est aussi amélioré d'étape en étape : les premières étapes peuvent contenir des erreurs, corrigées par la suite. En échange, chaque mécanisme est visible, et chaque étape tient en quelques fichiers qu'on peut lire en entier.

Le code est publié sous licence MIT : [github.com/YoannB/neural-network-js](https://github.com/YoannB/neural-network-js).
