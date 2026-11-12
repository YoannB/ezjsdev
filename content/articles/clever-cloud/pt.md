---
title: "Clever-cloud e aplicação Node.JS"
slug: clever-cloud-e-aplicacao-node-js
date: 2014-10-05
description: "Tutorial para implantar a sua primeira aplicação Node.JS no Clever-cloud."
---

## Inscrição

Acesse o site do [clever-cloud][1] para se inscrever.

> Para os usuários do github, basta entrar com a conta do github para, além disso, ter a chave ssh copiada automaticamente.

> Depois da inscrição manual, já na página do [console][2], na seção perfil/Chaves SSH (no menu em baixo à esquerda, depois no topo da nova página), é preciso informar a sua chave pública ssh no site:

```
# copiar a chave para a área de transferência
xclip -sel clip < ~/.ssh/id_rsa.pub
```

## Pagamento

Para começar, escolher a solução básica e selecionar Node.Js como linguagem.

> por padrão, a estimativa de custo do site é de 14,40 €/mês com 1 CPU e 1 GB de ram.

## Implantar a sua aplicação

Com Node.Js, tudo é feito automaticamente, desde que o projeto esteja configurado da seguinte forma:

- usar a porta 8080
- no arquivo package.json, informar:
    1. o "name"
    2. a "version"
    3. a tag "scripts" com o comando "start" que inicia o servidor
    4. todas as dependências necessárias ao projeto

Exemplo de package.json válido com servidor Express 4.9.5:

```json
{
  "name": "mon-projet",
  "version": "0.0.1",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "body-parser": "^1.9.0",
    "compression": "^1.1.0",
    "cookie-parser": "^1.3.3",
    "cookie-session": "^1.0.2",
    "ejs": "^0.8.5",
    "ejs-locals": "^1",
    "errorhandler": "^1.2.0",
    "express": "^4.9.5",
    "method-override": "^2.2.0",
    "morgan": "^1.3.2",
    "serve-favicon": "^2.1.5",
    "serve-static": "^1.6.3"
  },
  "engines": {
    "node": ">=0.10.32",
    "npm": "1.2.x"
  }
}
```

> Para iniciar o ambiente em modo **produção**:

```
"scripts": {
   "start": "NODE_ENV=production node server.js"
 }
```

## Colocar a sua aplicação no Clever-cloud

Nada mais simples: o Clever-cloud usa **git**. Ao escolher a linguagem, antes de configurar a chave ssh, você recebe um link **git remote**:

```
git remote add clever git+ssh://git@push.par.clever-cloud.com/app_[id_da_sua_app].git
```

No diretório da aplicação, executar o comando anterior (git remote ...).

Se o projeto ainda não for um projeto **git**, executar `git init`.

Depois, se o arquivo **.gitignore** do projeto estiver atualizado e tudo estiver bem preparado, executar os comandos:

```
git add .
git commit -m "initial commit"
git push clever master
```

> A aplicação será implantada automaticamente; para ver o log do servidor, é preciso ir ao console clever-cloud da aplicação (link **Logs**). Se tudo correr bem, você verá as linhas:

```
2014-10-09T16:51:57.062Z (GMT) Successfuly deployed in 1 minute and 5 seconds
2014-10-09T16:51:57.062Z (GMT) Server up
```

> Em caso de problema com a chave ssh, o comando seguinte permite carregar a chave na sessão do terminal:

```
ssh-add ~/.ssh/id_rsa
```

[1]: https://www.clever-cloud.com/fr/
[2]: https://console.clever-cloud.com
