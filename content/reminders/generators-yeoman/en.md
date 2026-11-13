---
title: "Yeoman Generators"
slug: yeoman-generators
date: 2014-02-16
description: "List of Yeoman generators."
---

Official article on GitHub: https://github.com/yeoman/yeoman/wiki/Generators

**Prerequisites:** Node.JS, Grunt, Yo and Bower must be installed.

## Installation

In a terminal

```bash
npm install -g yo generator-generator
```

## Creating a generator

Coming soon...

## The basic generators

Here is a non-exhaustive list of generators:

- generator-webapp
- generator-angular [readme][1]
- generator-backbone [readme][2]
- generator-threejs
- generator-node-boilerplate
- generator-node-express
- generator-angular-fullstack [readme][3]

To find a generator, look [here][4].

To get started with a generator, install it:

```bash
sudo npm install generator-angular
mkdir angular
cd angular
yo angular
```

Once done, the node modules have been installed. And to run the project:

```bash
grunt serve
```

The application is served at http://localhost:9000

[1]: https://github.com/yeoman/generator-angular#readme
[2]: https://github.com/yeoman/generator-backbone#readme
[3]: https://github.com/DaftMonk/generator-angular-fullstack/blob/master/readme.md
[4]: http://yeoman.io/community-generators.html
