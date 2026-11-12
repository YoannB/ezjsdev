---
title: "Raspberry PI"
slug: raspberry-pi-como-servidor
date: 2014-09-20
description: "Configuração de um Raspberry PI como servidor."
---

Instalar e configurar o seu raspberry PI como servidor.

## Instalação do cartão SD

No ubuntu, é preciso desmontar o cartão SD para depois copiar a imagem:

```
# obter o nome do cartão SD
df -h
# desmontar o cartão SD
umount /dev/sdb1
# Cópia da imagem Raspbian para o cartão SD
dd bs=4M if=YYYY-MM-DD-wheezy-raspbian.img of=/dev/sdb
```

> Entre os problemas possíveis, se o raspberry mostrar uma tela preta, adicionar no arquivo **config.txt** do cartão SD a linha:

```
#help to boot
boot_delay=1
```

> Resolução HD com um raspberry pi 2 e Wheezy:

```
hdmi_drive=2
hdmi_group=1
hdmi_mode=31
```

> As outras opções estão descritas no arquivo de configuração do cartão SD.

## Configuração

A janela de configuração abre automaticamente no primeiro arranque, mas também é possível abri-la de novo digitando no console o comando:

```
sudo raspi-config
```

## Montar um disco rígido externo

Para ter mais armazenamento e também para poupar a vida útil do cartão SD, é preferível configurar o armazenamento num disco rígido externo.

> Antes de mais: configurar as partições do novo disco rígido com um utilitário (no ubuntu, usar o **gparted**, por exemplo):
>
> - uma partição para o **home**
> - uma partição para o armazenamento

Depois de ligar o disco rígido ao raspberry PI, é preciso

```
# obter o nome do disco rígido
df -h
# montar o disco rígido (trocar sdb1 pelo nome encontrado)
mount /dev/sdb1 /media/data
```

Para poupar o cartão SD, também copio todo o **home** para a partição do disco rígido

```
# mover o home para uma partição /home do disco rígido externo
cd /mnt
sudo mkdir new_home/
sudo mount /dev/sda1 /mnt/new_home
sudo cp -a /home/. /mnt/new_home/
```

Terminar adicionando à tabela de partições do raspberry PI,

```
sudo vi /etc/fstab
```

As linhas seguintes:

```
# novo home
/dev/sdb1       /home           ext4    defaults        0       2
# partição de armazenamento
/dev/sdb2       /media/data     ext4    defaults        0       2
```

## Configuração do **hostname**

O nome que o Raspberry PI terá na rede pode ser configurado a partir da janela de configuração (sudo raspi-config), mas também pode ser editado à mão no arquivo **hosts**:

```
sudo vi /etc/hosts
```

Adicionar as linhas:

```
127.0.0.1 localhost
127.0.0.1 nome-da-maquina
```

## Gestão de usuários

Para adicionar um usuário ao raspberry PI:

```
sudo adduser username
```

> Para que o novo usuário tenha os mesmos direitos que o usuário **pi** padrão, executar:

```
sudo visudo
```

E adicionar a linha:

```
username ALL=(ALL) NOPASSWD: ALL
```

Depois pressionar **Ctrl+O**, **Enter**, **Ctrl+X**.

## Instalação dos pacotes úteis ao servidor

Atualização dos pacotes:

```
sudo apt-get update
sudo apt-get upgrade
```

Instalação do samba:

```
sudo apt-get install samba samba-common-bin
```

Instalação do Lighttpd (equivalente leve e simples de um servidor apache):

```
sudo apt-get install lighttpd
```

Instalação do ssh:

```
sudo apt-get install ssh
```

Instalação do Webmin:

```
wget http://prdownloads.sourceforge.net/webadmin/webmin_1.660_all.deb
sudo apt-get install libapt-pkg-perl libnet-ssleay-perl libauthen-pam-perl libio-pty-perl apt-show-versions
sudo dpkg --install webmin_1.660_all.deb
```

## Configuração do Samba

Ver o lembrete correspondente, [aqui][samba].

## Fixar o ip do raspberry na rede

Editar o arquivo **interfaces**:

```
sudo gedit /etc/network/interfaces
```

> Mais fácil de fazer em modo console; a partir do Wheezy, o _gedit_ deve ser substituído pelo editor _leafpad_

E substituir

```
iface eth0 inet dhcp
```

Por

```
iface eth0 inet static
address 192.168.0.1
netmask 255.255.255.0
gateway 192.168.0.254
```

Reiniciar o raspberry PI:

```
sudo reboot
```

## Instalação do Node.js

```
cd /home/keople
wget http://nodejs.org/dist/v0.10.28/node-v0.10.28.tar.gz
tar -zxf node-v0.10.28.tar.gz
cd node-v0.10.28
./configure
sudo make install
```

> Para mudar a versão a instalar, consultar o [site do Node.JS][1].

> Node.js sem SUDO

```
sudo chown -R $USER /usr/local
sudo chown -R $USER /home/$USER/.npm
```

## Instalação do Yeoman

```
npm install -g yo
npm install -g grunt-cli
npm install -g bower
```

Ver o lembrete correspondente, [aqui][yeoman].

## Instalação de um servidor git privado

```
sudo apt-get install git-core
sudo apt-get install wget (se necessário)
sudo apt-get install ssh (se necessário)
sudo /etc/init.d/ssh start (se necessário)
sudo update-rc.d ssh defaults (se necessário)
```

#### Criação de um novo usuário **git**:

```
sudo adduser --system --shell /bin/bash --gecos 'git version control by pi' --group --home /home/git git
```

ou criação do grupo **git** e adição a um usuário

```
sudo addgroup git
sudo adduser $USER git
```

#### Criação de um novo projeto:

```
cd /home/$USER
mkdir git
cd git
mkdir default.git
cd default.git
git --bare init
sudo git remote add default $USER@[hostname]:/home/$USER/git/default.git
```

#### Exemplo de utilização

No seu espaço de trabalho, obter o projeto:

```
git clone $USER@[hostname]:/home/$USER/git/default.git
```

Criar um arquivo **test.txt**:

```
git add test.txt
git commit -am "initial"
git push origin master
```

[samba]: #!reminders/samba
[yeoman]: #!reminders/yeoman
[1]: http://nodejs.org/dist/
