---
title: "Making browsers consistent"
slug: making-browsers-consistent
date: 2014-09-05
description: "Reminder for making browsers behave consistently."
---

To get web development off to a good start, you have to begin with the target browsers, and the simplest approach is to make the rendering consistent across every browser.

## JavaScript polyfills

Polyfills are a set of functions that emulate, on an old browser, features that are not natively available.

Among the most useful:

- [json3][1]: to decode and parse JSON.
- [es5][2]: implementation of the EcmaScript 5 functions.
- [Respond][3]: emulates media queries using window.onresize.

For a Node.JS project, here is the configuration with [Bower][bower] (in bower.json):

```json
"json3": "~3.2.6",
"es5-shim": "~2.1.0",
"respond": "~1.4.2"
```

> Note: you also need to add the **es5-sham** dependency by hand, below the line for **es5-shim**:
>
> ```html
> <script src="/bower_components/es5-shim/es5-shim.js"></script>
> <script src="/bower_components/es5-shim/es5-sham.js"></script>
> ```

## CSS reset

A CSS reset is needed to set the value of some HTML elements back to 0, so the rendering is closer across browsers.

Depending on the project, there are several ways to include the CSS reset:

- with a CSS framework (included automatically): [Bootstrap][4], [Pure][5], [Knacss][6], ...
- with a reset .css file (to add): [Normalize.css][7], [Eric Meyer's Reset CSS][8], [YUI CSS reset][9], ...
- with Node.JS and Stylus: [Nib][10], picking among the available resets:
    - `global-reset()`
    - `nested-reset()`
    - `reset-font()`
    - `reset-box-model()`
    - `reset-body()`
    - `reset-table()`
    - `reset-table-cell()`
    - `reset-html5()`

## HTML

Add the following lines at the end of the page's **head**:

```html
<!-- html 5 new elements -->
<!--[if lt IE 9]><script>"abbr,article,footer,header,nav,section,time".replace(/\w+/g,function(t){document.createElement(t);});</script><![endif]-->
```

> These lines add the new tags to the HTML document.

[bower]: /en/reminders/grunt-yo-bower-yeoman
[1]: http://bestiejs.github.io/json3/
[2]: https://github.com/es-shims/es5-shim
[3]: https://github.com/scottjehl/Respond
[4]: http://getbootstrap.com/css/
[5]: http://purecss.io/
[6]: http://www.knacss.com/
[7]: https://github.com/necolas/normalize.css
[8]: http://meyerweb.com/eric/tools/css/reset/
[9]: http://yuilibrary.com/yui/docs/cssreset/
[10]: http://visionmedia.github.io/nib/
