---
title: "Mediatomb no Ubuntu"
slug: mediatomb-no-ubuntu
date: 2014-05-08
description: "Lembrete para criar um servidor Mediatomb (Ubuntu)."
---

**Nota:** eis um lembrete relacionado ao meu trabalho atual, uma coisinha que tive de instalar esta semana para testar o projeto em que trabalho.

O **Mediatomb** permite criar o seu próprio servidor DLNA; assim é possível, entre outras coisas, ver o conteúdo do servidor na TV ou no decodificador.

## Instalação

Documentação oficial [aqui][1]

```bash
sudo apt-get install mediatomb
```

## Configuração

#### Para ativar a interface do Mediatomb, editar o arquivo de configuração:

```bash
sudo gedit /etc/mediatomb/config.xml
```

Alterar o valor (linha 7)

```xml
<ui enabled="no" show-tooltips="yes">
```

para

```xml
<ui enabled="yes" show-tooltips="yes">
```

Depois, reiniciar o servidor:

```bash
sudo service mediatomb restart
```

#### Acesso à interface web

[http://localhost:49152/][2] (com Ubuntu 10.04 e 10.10)

ou

[http://localhost:49153/][3] (com Ubuntu 13.04+)

#### Visualização

![Interface web do Mediatomb](/reminders/mediatomb/mediatomb.png)

**Nota**: para limpar o banco de dados, apagar o arquivo **/var/lib/mediatomb/mediatomb.db** e depois reiniciar o mediatomb.

[1]: http://doc.ubuntu-fr.org/mediatomb
[2]: http://localhost:49152/
[3]: http://localhost:49153/
