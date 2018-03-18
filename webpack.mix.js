let mix = require('laravel-mix');

mix.sass('src/css/style.scss', 'dist')
  .js('src/site.js', 'dist')
  .copy('src/img/favicon.png', 'dist/favicon.png')
	.setPublicPath('dist')
	.webpackConfig({
		module: {
			rules: [{
				test: /\.pug/,
				loaders: [
					"file-loader?name=[name].html",
					"extract-loader",
					'html-loader',
					'pug-html-loader'
				]
			}]
    },
    resolve: {
      alias: {
        'node_modules': path.join(__dirname, 'node_modules'),
        'src': path.resolve(__dirname, 'src/'),
        'images': path.resolve(__dirname, 'src/img/'),
        'styles': path.resolve(__dirname, 'src/styles/'),
        'html': path.resolve(__dirname, 'src/html/')
      }
    }
	});
