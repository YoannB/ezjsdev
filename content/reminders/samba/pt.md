---
title: "Servidor de compartilhamento Samba"
slug: servidor-de-compartilhamento-samba
date: 2014-09-22
description: "Lembrete para criar um servidor de compartilhamento Samba."
---

## Instalação

Instalar os seguintes pacotes:

```bash
sudo apt-get install samba samba-common-bin
```

## Configuração

Toda a configuração é feita no arquivo **smb.conf** (no Ubuntu /etc/samba/smb.conf). O arquivo de configuração é comentado e bastante simples de modificar.

Eis um exemplo com as linhas a acrescentar para criar um diretório **public** e um diretório **partage** (compartilhamento) protegido:

```ini
[Public]
#
# Diretório "pau para toda obra" com escrita permitida a todos
#
    comment = Partage Public
    path = /mnt/data/public
    create mode = 644
    writeable = yes
    public = yes
    hide files = /lost+found/

#
# Compartilhamento de um diretório montado no servidor
#
[Partage]
    comment = Partage
    path = /mnt/data/media
    available = yes
    browsable = yes
    public = no
    write list = @admin
    writeable = no
    force group = +admin
    force create mode = 664
    force directory mode = 775
    hide files = /lost+found/
```

> Nota: para quem prefere interfaces gráficas, é possível instalar o [webmin][1], que tem uma seção para administrar o servidor Samba.

## Segurança

Com a opção **encrypt passwords = true**, é preciso criar ou modificar os usuários que terão acesso aos diretórios.

Primeiro, se o grupo **samba** não tiver sido criado, adiciona-se:

```bash
sudo groupadd samba
```

Depois é preciso:

- criar um novo usuário samba:

    ```bash
    sudo useradd -s /bin/false -d /dev/null -g samba [nome_usuario]
    sudo smbpasswd -a [nome_usuario]
    ```

- ou modificar um usuário existente:

    ```bash
    sudo adduser [nome_usuario_existente] samba
    sudo smbpasswd -a [nome_usuario_existente]
    ```

[1]: http://www.webmin.com/
