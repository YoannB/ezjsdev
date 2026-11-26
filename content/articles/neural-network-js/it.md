---
title: "Una rete neurale in JavaScript, passo dopo passo"
slug: rete-neurale-in-javascript-passo-dopo-passo
date: 2026-11-25
description: "Una rete neurale scritta in JavaScript, senza librerie: dal primo neurone a un piccolo framework, una tappa per tag Git."
---

[neural-network-js](https://github.com/YoannB/neural-network-js) è una rete neurale scritta in JavaScript per Node.js, senza librerie di apprendimento automatico. È stata costruita per tappe nel gennaio 2026: prima un singolo neurone, poi un piccolo framework che fa regressione e classificazione binaria, classifica immagini e sceglie tra più classi.

Prima di usare un concetto nuovo, mi piace capire come funziona rifacendolo da me. Avevo già provato gli strumenti offerti da Google per le reti neurali; volevo vederne una versione semplice, il più vicino possibile alla matematica che la fa funzionare.

Il codice è stato scritto con l'assistenza dell'IA (ChatGPT). Ogni tappa corrisponde a un tag Git: la cronologia è stata ricostruita nel novembre 2026, con Claude, a partire dalle versioni successive del progetto e alle loro date originali, e il README di ogni tag, redatto in quel momento, descrive la tappa con esempi di esecuzione. Per seguire il progetto in ordine:

```sh
git clone https://github.com/YoannB/neural-network-js.git
cd neural-network-js
git checkout step-01-first-neuron
```

I README e i commenti del codice sono in francese. Serve Node.js 18 o successivo.

| Tag                      | Data       | Tappa                                    |
| ------------------------ | ---------- | ---------------------------------------- |
| `step-01-first-neuron`   | 8 gennaio  | Un neurone: y = w·x                      |
| `step-02-neuron-bias`    | 8 gennaio  | Un neurone con bias: y = w·x + b         |
| `step-03-neurons`        | 8 gennaio  | Una rete 1-3-1 e la retropropagazione    |
| `step-04-x-squared`      | 14 gennaio | Approssimazione di x²                    |
| `step-05-mini-framework` | 16 gennaio | Mini-framework e classificazione binaria |
| `step-06-images`         | 17 gennaio | Classificazione di immagini              |
| `step-07-optimizers`     | 22 gennaio | Ottimizzatori Adam e RMSprop             |
| `step-08-multiclass`     | 27 gennaio | Classificazione multiclasse              |

## Tappa 1: un neurone

Il punto di partenza sta in poche righe: un neurone con un solo peso `w`, che deve trovare la relazione `y = 3x` a partire da cinque esempi. A ogni esempio confronta la sua previsione con il valore atteso e corregge il peso nella direzione che riduce l'errore quadratico. È la discesa del gradiente, nella sua forma più semplice.

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

Dopo l'addestramento (1000 passaggi sui dati per impostazione predefinita, le «epoche»), il peso vale 3,0000 e il neurone risponde 30 per l'ingresso 10. Tre script accompagnano il neurone e restano fino alla fine: `train` (addestrare e salvare il modello), `exec` (prevedere) e `reset` (ripartire da un peso casuale).

[Codice della tappa 1](https://github.com/YoannB/neural-network-js/tree/step-01-first-neuron)

## Tappa 2: il bias

Un peso da solo rappresenta soltanto rette che passano per l'origine. Il neurone riceve quindi un bias `b`: `y = w·x + b`. Il bias ha il suo gradiente (`2 × errore`), corretto insieme al peso. Sugli stessi dati, l'addestramento trova `w = 3` e `b = 0`.

[Codice della tappa 2](https://github.com/YoannB/neural-network-js/tree/step-02-neuron-bias) · [cosa cambia](https://github.com/YoannB/neural-network-js/compare/step-01-first-neuron...step-02-neuron-bias)

## Tappa 3: più neuroni

Il neurone singolo diventa una rete: un ingresso, uno strato nascosto di tre neuroni con l'attivazione ReLU, un neurone di uscita. Il codice si divide in tre classi, `Neuron`, `Layer` e `Network`, e la retropropagazione è scritta a mano: l'errore di uscita viene rimandato a ogni neurone nascosto, moltiplicato per il peso che lo collega all'uscita.

```js
this.output.backward([error]);
this.hidden.backward(
    this.output.neurons[0].weights.map(
        (w) => error * w
    )
);
```

I dati restano `y = 3x`, un problema che un solo neurone risolveva già. L'interesse della tappa è il meccanismo, su cui poggia tutto il resto.

[Codice della tappa 3](https://github.com/YoannB/neural-network-js/tree/step-03-neurons) · [cosa cambia](https://github.com/YoannB/neural-network-js/compare/step-02-neuron-bias...step-03-neurons)

## Tappa 4: x²

Una retta non basta più: la rete deve approssimare `y = x²` sull'intervallo [0, 5], a partire da 51 punti. È la tappa in cui compaiono la maggior parte delle regolazioni che si ritrovano nelle vere librerie:

- uno strato nascosto di 12 neuroni con tangente iperbolica (tanh) e un'uscita lineare;
- pesi inizializzati a una scala che dipende dal numero di ingressi;
- gradienti limitati (a ±5) e un controllo dei valori non finiti, perché l'addestramento non diverga;
- ingressi e uscite normalizzati, con i fattori salvati nel modello;
- opzioni da riga di comando (`--epochs`, `--neurons`, `--lr`, `--noise`) e uno script `table` che confronta, punto per punto, il valore atteso e il valore previsto.

Con il modello fornito, la rete risponde per esempio 6,25 per 2,5 e 25,08 per 5.

[Codice della tappa 4](https://github.com/YoannB/neural-network-js/tree/step-04-x-squared) · [cosa cambia](https://github.com/YoannB/neural-network-js/compare/step-03-neurons...step-04-x-squared)

## Tappa 5: un mini-framework

Il codice viene riorganizzato per servire a più problemi. La rete (neurone, strato, rete, attivazioni) passa in `src/core/`, i dataset in `src/datasets/`, e il dataset si sceglie per nome dalla riga di comando. Gli ingressi diventano vettori, con un controllo delle dimensioni.

Sono forniti tre dataset:

- `square`: x², come nella tappa precedente;
- `xor`: l'OR esclusivo, il caso classico che un neurone da solo non sa risolvere;
- `primes`: un numero da 0 a 13, dato in binario su 5 bit, è primo?

Gli ultimi due sono problemi di classificazione binaria: l'uscita passa per una sigmoide, che dà un valore tra 0 e 1, e l'errore è misurato con l'entropia incrociata binaria. Il tipo di compito è salvato nel modello.

[Codice della tappa 5](https://github.com/YoannB/neural-network-js/tree/step-05-mini-framework) · [cosa cambia](https://github.com/YoannB/neural-network-js/compare/step-04-x-squared...step-05-mini-framework)

## Tappa 6: le immagini

Lo stesso framework ora classifica foto. Il dataset `images` legge file JPEG, li riduce a 32 × 32 pixel in scala di grigi con la libreria `sharp`, e ogni immagine diventa un vettore di 1024 valori tra 0 e 1. L'etichetta viene dal nome del file: `_ok` o `_ko`. Uno script scarica foto di arance da Pixabay; resta da etichettarle a mano.

Su 100 foto di arance, la rete classifica correttamente tutte le immagini di addestramento. Il README lo precisa: questa accuratezza è misurata sulle immagini apprese, non su immagini nuove. Su tre foto fuori dall'addestramento, l'uscita vale 0,99 per un'arancia, 0,77 per un mandarino clementino e 0,08 per un'albicocca.

[Codice della tappa 6](https://github.com/YoannB/neural-network-js/tree/step-06-images) · [cosa cambia](https://github.com/YoannB/neural-network-js/compare/step-05-mini-framework...step-06-images)

## Tappa 7: gli ottimizzatori

Fino ad allora, ogni peso veniva corretto con una semplice discesa del gradiente. Si aggiungono altri due metodi di aggiornamento, da scegliere con `--optimizer`:

- `rmsprop` divide il passo per la media mobile del quadrato dei gradienti;
- `adam`, il metodo predefinito, combina le medie mobili del gradiente e del suo quadrato, con una correzione del bias all'inizio dell'addestramento.

Il README confronta i tre metodi su XOR, in 2000 epoche e con lo stesso tasso di apprendimento: l'errore finale è di circa 0,53 con la discesa semplice, 0,01 con Adam e 0,000006 con RMSprop.

La tappa mette anche in ordine il progetto: ogni dataset ha il suo modello in `models/<nome>.json`, il salvataggio passa per `Network.toJSON()` e si aggiunge un dataset `linear` (y = 2x − 1).

[Codice della tappa 7](https://github.com/YoannB/neural-network-js/tree/step-07-optimizers) · [cosa cambia](https://github.com/YoannB/neural-network-js/compare/step-06-images...step-07-optimizers)

## Tappa 8: più classi

Ultima tappa: la rete può avere più uscite e scegliere una classe tra diverse. Lo strato di uscita usa la funzione softmax, che trasforma le uscite in probabilità la cui somma vale 1, e l'errore è misurato con l'entropia incrociata categoriale. L'errore di ogni uscita viene retropropagato verso lo strato nascosto.

L'esempio è sasso-carta-forbici: per ogni mossa, la rete deve indicare quella che la batte. Il problema è volutamente piccolo: serve a verificare il meccanismo a più uscite.

[Codice della tappa 8](https://github.com/YoannB/neural-network-js/tree/step-08-multiclass) · [cosa cambia](https://github.com/YoannB/neural-network-js/compare/step-07-optimizers...step-08-multiclass)

## Cosa il progetto non è

È un progetto di apprendimento, non una libreria da usare in produzione. La rete ha un solo strato nascosto, i calcoli si fanno neurone per neurone, senza calcolo matriciale, e il progetto non ha test automatici. Inoltre è migliorato di tappa in tappa: le prime tappe possono contenere errori, corretti in seguito. In cambio, ogni meccanismo è visibile e ogni tappa sta in pochi file che si possono leggere per intero.

Il codice è pubblicato con licenza MIT: [github.com/YoannB/neural-network-js](https://github.com/YoannB/neural-network-js).
