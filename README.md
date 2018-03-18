# unixMiB.github.io

## Requirements

* `node`, `npm`, `git`, `git-lfs` (https://git-lfs.github.com/)
* Knowledge of HTML, Sass
  * Nice to have: Knowledge of Pug (https://github.com/pugjs/pug#syntax)
    * Very fast to learn if you know html

## Working on the project

* `git clone https://github.com/unixMiB/unixmib.github.io`
* `git lfs pull`
* `npm install`
* `npm run hot`
* Edit files in `src` folder.
* The website will be available on `http://localhost:8080/index.html`

### Building for production

* `npm run production`
* built files will be in the `dist/folder`

## Technologies & Tools

* Webpack for build management
  * Most of the work is taken care by [laravel-mix](https://github.com/JeffreyWay/laravel-mix) with a few custom configs inside `webpack.mix.js`
* Pug for HTML Templating
* Sass for the style (with a few helper classes)
* Other: Fontawesome Icons

## Accessibility

The skin must be responsive.

Don't use blue color for text unless it's a link.

HTML5/CSS standards must be followed (you should use https://validator.w3.org and https://jigsaw.w3.org/css-validator/).

Use Multimedia Fallback (`alt=""` in img tags and so on). Use `longdesc` attributes when needed.

Keyboard can be used to move between elements of the page without problems.
If it is necessary use `tabindex`.

Test the website in greyscale and in high contrast.

A `nav` tag must contain one and only one `ul` element.
