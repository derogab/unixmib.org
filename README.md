## How to work on the project

* Clone/fork
* `npm install`
* `npm run setup`
* `npm run dev`
* Edit files in `src` folder.

### Building

* `npm run build`

### Accessibility
The skin must be responsive.

The template follows the HTML/CSS Style Guide made by Google: https://google.github.io/styleguide/htmlcssguide.html (only rules related to accessibility for now):
* HTML5/JS standards must be followed (you should use https://validator.w3.org and https://jigsaw.w3.org/css-validator/);
* Use Multimedia Fallback;

## Technologies & Tools

* Gulp
* Bower for CSS/JS components
* Nunjucks for HTML Templating
* Sass for the style (with a few helper classes)
* Other: Foundation Icons

## Gulp script

The included gulp script will take care of starting the local dev environment.

Interesting features of the script:

* livereload the browser on changes
* prefixing of CSS rules
* html, css, js, image minification
* Sass compilation
* Much more
