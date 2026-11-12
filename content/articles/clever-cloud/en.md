---
title: "Clever-cloud & a Node.JS application"
slug: clever-cloud-and-node-js-application
date: 2014-10-05
description: "Tutorial to deploy your first Node.JS application on Clever-cloud."
---

## Sign-up

Go to the [clever-cloud][1] website to sign up.

> For github users, just log in with your github account, which also copies your ssh key automatically.

> After a manual sign-up, once on the [console][2] page, in the profile/SSH Keys section (in the menu at the bottom left, then at the top of the new page), you must enter your public ssh key on the site:

```
# copy your key to the clipboard
xclip -sel clip < ~/.ssh/id_rsa.pub
```

## Payment

To begin with, choose the basic plan and select Node.Js as the language.

> by default, the estimated cost of the site is €14.40/month with 1 CPU and 1 GB of ram.

## Deploying your application

With Node.Js, everything happens automatically, provided your project is set up as follows:

- use port 8080
- in the package.json file, fill in:
    1. the "name"
    2. the "version"
    3. the "scripts" tag with the "start" command that starts the server
    4. all the dependencies the project needs

Example of a valid package.json with an Express 4.9.5 server:

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

> To start the environment in **production** mode:

```
"scripts": {
   "start": "NODE_ENV=production node server.js"
 }
```

## Putting your application on Clever-cloud

Nothing could be simpler: Clever-cloud uses **git**. When you choose your language, before configuring your ssh key, you are given a **git remote** link:

```
git remote add clever git+ssh://git@push.par.clever-cloud.com/app_[your_app_id].git
```

In your application's directory, run the previous command (git remote ...).

If the project is not a **git** project yet, run `git init`.

Then, if your project's **.gitignore** file is up to date and everything is well prepared, run the commands:

```
git add .
git commit -m "initial commit"
git push clever master
```

> The application deploys automatically; to see the server log, go to your application's clever-cloud console (**Logs** link). If all goes well, you will see the lines:

```
2014-10-09T16:51:57.062Z (GMT) Successfuly deployed in 1 minute and 5 seconds
2014-10-09T16:51:57.062Z (GMT) Server up
```

> If there is a problem with the ssh key, the following command loads your key into your terminal session:

```
ssh-add ~/.ssh/id_rsa
```

[1]: https://www.clever-cloud.com/fr/
[2]: https://console.clever-cloud.com
