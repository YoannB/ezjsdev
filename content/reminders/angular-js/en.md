---
title: "Angular FullStack"
slug: angular-fullstack
date: 2014-03-10
description: "Reminder for getting started with Angular FullStack."
---

- Install [Node.JS][1]

- Install [Grunt/Yo/Bower][2]

- Install the angular-fullstack generator

    ```bash
    sudo npm install generator-angular-fullstack
    ```

> **Note:** for other generators, see the reminder about popular [generators][3]

Structure of the generated project:

![Structure](/reminders/angular-js/angular_struc.png)

Once the project is installed, you need to download the dependencies by running the command

```bash
bower install
```

> **Note:** with a global installation, a blocking message may appear; with 'bower install --allow-root' the command goes through

The commands defined by **grunt** are:

- run the application in development mode

    ```bash
    grunt serve
    ```

- build and run in production mode

    ```bash
    grunt serve:dist
    ```

- generate the project distribution

    ```bash
    grunt build
    ```

To run the distribution, go to the 'dist' directory and run the command

```bash
NODE_ENV=production node server.js
```

Tests with karma:

**Note:** a karma.conf.js file is needed, so if it was not generated, you will have to add one ([example][4])

- Run the server-side tests

    ```bash
    grunt test:server
    ```

- Run the client-side tests

    ```bash
    grunt test:client
    ```

[1]: /en/reminders/installing-node-js
[2]: /en/reminders/grunt-yo-bower-yeoman
[3]: /en/reminders/yeoman-generators
[4]: https://raw.githubusercontent.com/YoannB/fullstack-demo/master/karma.conf.js
