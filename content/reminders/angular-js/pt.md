---
title: "Angular FullStack"
slug: angular-fullstack
date: 2014-03-10
description: "Lembrete para começar com o Angular FullStack."
---

- Instalar o [Node.JS][1]

- Instalar o [Grunt/Yo/Bower][2]

- Instalar o gerador angular-fullstack

    ```bash
    sudo npm install generator-angular-fullstack
    ```

> **Nota:** para outros geradores, ver o lembrete sobre os [geradores][3] em voga

Estrutura do projeto gerado:

![Estrutura](/reminders/angular-js/angular_struc.png)

Depois de instalado o projeto, é necessário baixar as dependências executando o comando

```bash
bower install
```

> **Nota:** em caso de instalação global, pode aparecer uma mensagem bloqueante; com 'bower install --allow-root' o comando passa

Os diferentes comandos definidos pelo **grunt** são:

- iniciar a aplicação em modo de desenvolvimento

    ```bash
    grunt serve
    ```

- build e início em modo de produção

    ```bash
    grunt serve:dist
    ```

- gerar a distribuição do projeto

    ```bash
    grunt build
    ```

Para iniciar a distribuição, vá ao diretório 'dist' e execute o comando

```bash
NODE_ENV=production node server.js
```

Testes com karma:

**Nota:** é preciso um arquivo karma.conf.js; se não tiver sido gerado, será preciso adicionar um ([exemplo][4])

- Execução dos testes do lado do servidor

    ```bash
    grunt test:server
    ```

- Execução dos testes do lado do cliente

    ```bash
    grunt test:client
    ```

[1]: /pt/lembretes/instalacao-do-node-js
[2]: /pt/lembretes/grunt-yo-bower-yeoman
[3]: /pt/lembretes/geradores-yeoman
[4]: https://raw.githubusercontent.com/YoannB/fullstack-demo/master/karma.conf.js
