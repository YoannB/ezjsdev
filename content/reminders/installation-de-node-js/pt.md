---
title: "Instalação do Node.js"
slug: instalacao-do-node-js
date: 2013-12-01
description: "Lembrete para instalar o Node.JS."
---

## Windows

Seguir o procedimento no site oficial [nodejs.org][1].

## Ubuntu

Num terminal, executar as seguintes linhas:

```bash
sudo apt-get install npm
sudo npm cache clean -f
sudo npm install -g n
sudo apt-get install curl ( if needed )
sudo n stable
```

> **NOTA:** em caso de erro ao obter pacotes, duas linhas úteis a executar:
>
> Configurar o registro:
>
> ```bash
> npm config set registry http://registry.npmjs.org/
> ```
>
> E se estiver atrás de um proxy:
>
> ```bash
> git config --global url."https://".insteadOf git://
> ```

## Para instalar as dependências, na pasta do projeto

```bash
sudo npm install
```

## Para iniciar a aplicação node 'app'

```bash
node app.js
```

Ou, se no package.json for definido o comando "start"

```json
"scripts" : {
  "start" : "node app.js"
}
```

Basta fazer

```bash
npm start
```

> **Instalação sem SUDO:** é aconselhável instalar o Node.JS de forma a não precisar de **sudo** em cada comando.
>
> Alterar as permissões da instalação local:
>
> ```bash
> sudo chown -R $USER /usr/local
> ```
>
> e, se o diretório existir:
>
> ```bash
> sudo chown -R $USER /usr/lib/node_modules/
> ```

[1]: http://nodejs.org/
