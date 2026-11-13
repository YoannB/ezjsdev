---
title: "A blog for GitHub"
slug: blog-for-github
date: 2014-05-25
description: "Tutorial to create a blog that can be hosted on GitHub pages."
---

Original article [here][original]

Here is a blog for GitHub pages. Just [fork][0] the project and edit the configuration files to get **your** blog.

> First step: in the **index.html** file, you must replace the line

```html
 <base href="http://yoannb.github.io/gh-blog/">
```

With the url of your gh-pages:

```html
 <base href="http://[your.github.username].github.io/gh-blog/">
```

For more information on gh-pages, go [there][gh-pages] and/or have a look at my [reminder][reminder].

## Structure to customize **your** blog:

All the files you need to edit are in the **config** directory:

```
config
|---json
    |---site.json       -> site configuration (title,logo,photo,description...)
    |---skills.json     -> your skills, displayed on the home page and the cv
    |---cv.json         -> your experience and education
    |---blog.json       -> the list of blog articles
|---md
    |---blog            -> .md articles
|---styles
    |---theme.css       -> the css for visual customization
```

## The **site.json** file

This is the main file, where you can enable or disable each part of the site:

```json
"skills":true,
"cv":true,
"blog":true
```

- If you do not want **skills** on the home page and the CV, just set the attribute to false.
- If you do not want to see the menu for **cv** and / or **blog**, just set the attribute to false.
- If you do not want a **photo (picture)** on the home page, just remove the **picture** attribute; same for the **descriptions** attribute.

## Customize your photo

You have three choices for your photo:

1. An image in the **images** directory:

    ```json
    "photo": {
        "img":"images/me.jpg"
    }
    ```

2. Your **GitHub username**:

    ```json
    "photo": {
        "github":"github"
    }
    ```

3. Or your **gravatar email address**:

    ```json
    "photo": {
        "gravatar":"github@mail.com"
    }
    ```

## Your CV

You just need to edit the **cv.json** file.

## Your skills

Likewise, you just need to edit the **skills.json** file.

## Writing an article

Add an item to the **blog.json** file, as in the following example:

```json
{
    "id" : "the-id",
    "title": "The title",
    "date" : "05/05/2014", // date in US format MM/dd/yyyy
    "file" : "config/md/blog/2014/05/my.blog.md", // the path of the md file
    "visible" : false // use visible to show an article only when it is ready
}
```

Create a new file at the location you specified and write your article.

## Disqus configuration

Go to the [site][4] and register a new account if you want to use disqus on your blog.

Then add your new account identifier to the **site.json** file:

```json
"disqus" : {
    "shortname":"username"
},
```

## Customizing the Markdown display

You can change the style used by changing the css file in the **cssMarkdown** attribute:

```json
"cssMarkdown" : "github.css",
```

> **Note**: the list of available css files is in the **/bower_components/highlightjs/styles/** folder.

## More information about the project

- Uses [Angular.JS][1] version 1.2.15.
- Uses [Bootstrap CSS][2] for styles.
- Uses [Markdown][3] for articles.
- Uses [Disqus][4] for comments.
- Customization through JSON files.
- Generated with Node.JS and Grunt/Bower/Yo.

## Sources

The project's sources are [here][5] and the demo is [here][6].

[original]: https://github.com/YoannB/gh-blog/blob/master/README.md
[gh-pages]: https://pages.github.com/
[reminder]: /en/reminders/github-cheat-sheet
[0]: https://github.com/YoannB/gh-blog/fork
[1]: https://angularjs.org/
[2]: http://getbootstrap.com/css/
[3]: http://fr.wikipedia.org/wiki/Markdown
[4]: http://disqus.com/
[5]: https://github.com/YoannB/gh-blog
[6]: http://yoannb.github.io/gh-blog
