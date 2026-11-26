---
title: "Ein neuronales Netz in JavaScript, Schritt für Schritt"
slug: neuronales-netz-in-javascript-schritt-fuer-schritt
date: 2026-11-25
description: "Ein neuronales Netz in JavaScript, ohne Bibliothek: vom ersten Neuron zu einem kleinen Framework, ein Schritt pro Git-Tag."
---

[neural-network-js](https://github.com/YoannB/neural-network-js) ist ein neuronales Netz in JavaScript für Node.js, ohne Bibliothek für maschinelles Lernen. Es entstand im Januar 2026 in mehreren Schritten: zuerst ein einzelnes Neuron, dann ein kleines Framework, das Regression und binäre Klassifikation beherrscht, Bilder klassifiziert und zwischen mehreren Klassen wählt.

Bevor ich ein neues Konzept einsetze, verstehe ich gern, wie es funktioniert, indem ich es selbst nachbaue. Die Werkzeuge, die Google für neuronale Netze anbietet, hatte ich bereits ausprobiert; ich wollte eine einfache Version sehen, so nah wie möglich an der Mathematik, die sie antreibt.

Der Code wurde mit Unterstützung von KI (ChatGPT) geschrieben. Jeder Schritt ist ein Git-Tag: Die Historie wurde im November 2026 mit Claude aus den aufeinanderfolgenden Versionen des Projekts rekonstruiert, mit ihren ursprünglichen Daten, und das README jedes Tags, zu diesem Zeitpunkt verfasst, beschreibt den Schritt mit Ausführungsbeispielen. Um dem Projekt der Reihe nach zu folgen:

```sh
git clone https://github.com/YoannB/neural-network-js.git
cd neural-network-js
git checkout step-01-first-neuron
```

Die READMEs und die Kommentare im Code sind auf Französisch. Node.js 18 oder neuer wird benötigt.

| Tag                      | Datum      | Schritt                                  |
| ------------------------ | ---------- | ---------------------------------------- |
| `step-01-first-neuron`   | 8. Januar  | Ein Neuron: y = w·x                      |
| `step-02-neuron-bias`    | 8. Januar  | Ein Neuron mit Bias: y = w·x + b         |
| `step-03-neurons`        | 8. Januar  | Ein 1-3-1-Netz und die Rückpropagation   |
| `step-04-x-squared`      | 14. Januar | Annäherung von x²                        |
| `step-05-mini-framework` | 16. Januar | Mini-Framework und binäre Klassifikation |
| `step-06-images`         | 17. Januar | Bildklassifikation                       |
| `step-07-optimizers`     | 22. Januar | Optimierer Adam und RMSprop              |
| `step-08-multiclass`     | 27. Januar | Mehrklassen-Klassifikation               |

## Schritt 1: ein Neuron

Der Ausgangspunkt passt in wenige Zeilen: ein Neuron mit einem einzigen Gewicht `w`, das aus fünf Beispielen die Beziehung `y = 3x` finden soll. Bei jedem Beispiel vergleicht es seine Vorhersage mit dem erwarteten Wert und korrigiert sein Gewicht in die Richtung, die den quadratischen Fehler verringert. Das ist das Gradientenverfahren in seiner einfachsten Form.

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

Nach dem Training (standardmäßig 1000 Durchläufe über die Daten, die „Epochen“) beträgt das Gewicht 3,0000, und das Neuron antwortet 30 auf die Eingabe 10. Drei Skripte begleiten das Neuron und bleiben bis zum Ende: `train` (trainieren und das Modell speichern), `exec` (vorhersagen) und `reset` (mit einem zufälligen Gewicht neu beginnen).

[Code von Schritt 1](https://github.com/YoannB/neural-network-js/tree/step-01-first-neuron)

## Schritt 2: der Bias

Ein einzelnes Gewicht stellt nur Geraden durch den Ursprung dar. Das Neuron erhält deshalb einen Bias `b`: `y = w·x + b`. Der Bias hat seinen eigenen Gradienten (`2 × Fehler`) und wird zusammen mit dem Gewicht korrigiert. Mit denselben Daten findet das Training `w = 3` und `b = 0`.

[Code von Schritt 2](https://github.com/YoannB/neural-network-js/tree/step-02-neuron-bias) · [was sich ändert](https://github.com/YoannB/neural-network-js/compare/step-01-first-neuron...step-02-neuron-bias)

## Schritt 3: mehrere Neuronen

Aus dem einzelnen Neuron wird ein Netz: ein Eingang, eine verborgene Schicht aus drei Neuronen mit der ReLU-Aktivierung, ein Ausgangsneuron. Der Code teilt sich in drei Klassen, `Neuron`, `Layer` und `Network`, und die Rückpropagation ist von Hand geschrieben: Der Ausgangsfehler wird an jedes verborgene Neuron zurückgegeben, multipliziert mit dem Gewicht, das es mit dem Ausgang verbindet.

```js
this.output.backward([error]);
this.hidden.backward(
    this.output.neurons[0].weights.map(
        (w) => error * w
    )
);
```

Die Daten bleiben `y = 3x`, ein Problem, das schon ein einzelnes Neuron löste. Es geht in diesem Schritt um die Mechanik, auf der alles Weitere aufbaut.

[Code von Schritt 3](https://github.com/YoannB/neural-network-js/tree/step-03-neurons) · [was sich ändert](https://github.com/YoannB/neural-network-js/compare/step-02-neuron-bias...step-03-neurons)

## Schritt 4: x²

Eine Gerade reicht nicht mehr: Das Netz soll `y = x²` auf dem Intervall [0, 5] aus 51 Punkten annähern. In diesem Schritt erscheinen die meisten Einstellungen, die man in echten Bibliotheken findet:

- eine verborgene Schicht aus 12 Neuronen mit dem Tangens hyperbolicus (tanh) und ein linearer Ausgang;
- Gewichte, deren Startwerte von der Anzahl der Eingänge abhängen;
- begrenzte Gradienten (auf ±5) und eine Prüfung auf nicht endliche Werte, damit das Training nicht divergiert;
- normalisierte Ein- und Ausgaben, deren Faktoren im Modell gespeichert werden;
- Kommandozeilenoptionen (`--epochs`, `--neurons`, `--lr`, `--noise`) und ein Skript `table`, das Punkt für Punkt den erwarteten und den vorhergesagten Wert vergleicht.

Mit dem mitgelieferten Modell antwortet das Netz zum Beispiel 6,25 auf 2,5 und 25,08 auf 5.

[Code von Schritt 4](https://github.com/YoannB/neural-network-js/tree/step-04-x-squared) · [was sich ändert](https://github.com/YoannB/neural-network-js/compare/step-03-neurons...step-04-x-squared)

## Schritt 5: ein Mini-Framework

Der Code wird umgebaut, damit er für mehrere Probleme dient. Das Netz (Neuron, Schicht, Netz, Aktivierungen) wandert nach `src/core/`, die Datensätze nach `src/datasets/`, und der Datensatz wird auf der Kommandozeile über seinen Namen gewählt. Die Eingaben werden zu Vektoren, mit einer Prüfung der Dimensionen.

Drei Datensätze sind dabei:

- `square`: x², wie im vorigen Schritt;
- `xor`: das exklusive Oder, der klassische Fall, den ein einzelnes Neuron nicht lösen kann;
- `primes`: Ist eine Zahl von 0 bis 13, binär mit 5 Bit angegeben, eine Primzahl?

Die beiden letzten sind binäre Klassifikationsprobleme: Der Ausgang läuft durch eine Sigmoidfunktion, die einen Wert zwischen 0 und 1 liefert, und der Fehler wird mit der binären Kreuzentropie gemessen. Die Art der Aufgabe wird im Modell gespeichert.

[Code von Schritt 5](https://github.com/YoannB/neural-network-js/tree/step-05-mini-framework) · [was sich ändert](https://github.com/YoannB/neural-network-js/compare/step-04-x-squared...step-05-mini-framework)

## Schritt 6: Bilder

Dasselbe Framework klassifiziert jetzt Fotos. Der Datensatz `images` liest JPEG-Dateien, verkleinert sie mit der Bibliothek `sharp` auf 32 × 32 Pixel in Graustufen, und jedes Bild wird zu einem Vektor aus 1024 Werten zwischen 0 und 1. Das Label kommt aus dem Dateinamen: `_ok` oder `_ko`. Ein Skript lädt Fotos von Orangen von Pixabay herunter; beschriftet werden sie von Hand.

Bei 100 Orangenfotos klassifiziert das Netz alle Trainingsbilder richtig. Das README sagt es deutlich: Diese Genauigkeit wird auf den gelernten Bildern gemessen, nicht auf neuen. Bei drei Fotos außerhalb des Trainings liefert der Ausgang 0,99 für eine Orange, 0,77 für eine Clementine und 0,08 für eine Aprikose.

[Code von Schritt 6](https://github.com/YoannB/neural-network-js/tree/step-06-images) · [was sich ändert](https://github.com/YoannB/neural-network-js/compare/step-05-mini-framework...step-06-images)

## Schritt 7: die Optimierer

Bis dahin wurde jedes Gewicht mit dem einfachen Gradientenverfahren korrigiert. Zwei weitere Aktualisierungsverfahren kommen hinzu, wählbar mit `--optimizer`:

- `rmsprop` teilt den Schritt durch den gleitenden Mittelwert der quadrierten Gradienten;
- `adam`, die Voreinstellung, kombiniert die gleitenden Mittelwerte des Gradienten und seines Quadrats, mit einer Bias-Korrektur zu Beginn des Trainings.

Das README vergleicht die drei Verfahren an XOR, über 2000 Epochen und mit derselben Lernrate: Der Endfehler liegt bei etwa 0,53 mit dem einfachen Verfahren, 0,01 mit Adam und 0,000006 mit RMSprop.

Der Schritt räumt auch das Projekt auf: Jeder Datensatz hat sein eigenes Modell in `models/<name>.json`, das Speichern läuft über `Network.toJSON()`, und ein Datensatz `linear` (y = 2x − 1) kommt hinzu.

[Code von Schritt 7](https://github.com/YoannB/neural-network-js/tree/step-07-optimizers) · [was sich ändert](https://github.com/YoannB/neural-network-js/compare/step-06-images...step-07-optimizers)

## Schritt 8: mehrere Klassen

Letzter Schritt: Das Netz kann mehrere Ausgänge haben und eine Klasse unter mehreren wählen. Die Ausgangsschicht nutzt die Softmax-Funktion, die die Ausgaben in Wahrscheinlichkeiten mit der Summe 1 umwandelt, und der Fehler wird mit der kategorischen Kreuzentropie gemessen. Der Fehler jedes Ausgangs wird zur verborgenen Schicht zurückpropagiert.

Das Beispiel ist Schere, Stein, Papier: Für jeden Zug soll das Netz den Zug nennen, der ihn schlägt. Das Problem ist absichtlich klein; es dient dazu, die Mechanik mit mehreren Ausgängen zu prüfen.

[Code von Schritt 8](https://github.com/YoannB/neural-network-js/tree/step-08-multiclass) · [was sich ändert](https://github.com/YoannB/neural-network-js/compare/step-07-optimizers...step-08-multiclass)

## Was das Projekt nicht ist

Es ist ein Lernprojekt, keine Bibliothek für den Produktiveinsatz. Das Netz hat eine einzige verborgene Schicht, gerechnet wird Neuron für Neuron, ohne Matrizenrechnung, und das Projekt hat keine automatisierten Tests. Es hat sich zudem von Schritt zu Schritt verbessert: Die ersten Schritte können Fehler enthalten, die später korrigiert wurden. Dafür ist jeder Mechanismus sichtbar, und jeder Schritt passt in wenige Dateien, die man vollständig lesen kann.

Der Code steht unter der MIT-Lizenz: [github.com/YoannB/neural-network-js](https://github.com/YoannB/neural-network-js).
