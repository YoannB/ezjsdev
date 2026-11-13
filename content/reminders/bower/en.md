---
title: "Create a bower package"
slug: create-a-bower-package
date: 2015-03-30
description: "Reminder for creating a bower package."
---

## Create a project

Add the bower.json manifest:

```bash
bower init
```

Or create the bower.json file with this content:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "path/to/main.css",
  "description": "description...",
  "keywords": [
    "keyword"
  ],
  "ignore": [
    ".jshintrc",
    "**/*.txt"
  ],
  "dependencies": {
    "<name>": "<version>",
    "<name>": "<folder>",
    "<name>": "<package>"
  },
  "devDependencies": {
    "<test-framework-name>": "<version>"
  }
}
```

## Create the project on GitHub

See the [GitHub][github] reminder.

> Don't forget to create the matching tag for the project:
>
> ```bash
> git tag -a 1.0.0 -m "1.0.0"
> git push --tags
> ```

## Register the package

```bash
bower register <my-package-name> <git-endpoint>

# for example
bower register example git://github.com/user/example.git
```

## Remove a package

```bash
bower unregister <package>
```

Or

```bash
curl -X DELETE "https://bower.herokuapp.com/packages/<package>?access_token=<token>"
```

> More information on the [bower][0] website.

[0]: http://bower.io/docs/creating-packages/
[github]: /en/reminders/github-cheat-sheet
