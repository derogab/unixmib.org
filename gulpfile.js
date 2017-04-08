'use strict';
var path = require('path');

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSync = require('browser-sync');
var bowerFiles = require('main-bower-files');

var $ = gulpLoadPlugins();
var reload = browserSync.reload;

var srcFolder = path.resolve(__dirname, "src");
var distFolder = path.resolve(__dirname, "dist");

gulp.task('html', () => {
	return gulp.src([
		srcFolder + '/html/**/*.html', // all the html
		'!' + srcFolder + '/html/_nunjucks/**/*' // not the template files
	])
	.pipe($.plumber())
	.pipe($.nunjucksRender({
		path: srcFolder + '/html'
	}))
	.pipe($.inject(gulp.src('bower_components/**/*', {read: false, cwd: distFolder}), {name: 'bower', addRootSlash: false}))
	.pipe($.inject(gulp.src('css/*.css', {read: false, cwd: distFolder}), {addRootSlash: false}))
	.pipe($.inject(gulp.src('js/**/*.js', {read: false, cwd: distFolder}), {addRootSlash: false}))
	.pipe($.minifyHtml())
	.pipe(gulp.dest(distFolder));
});

gulp.task('css', () => {
	return gulp.src(srcFolder + '/css/style.scss')
	.pipe($.plumber())
	.pipe($.sass())
	.pipe($.autoprefixer('last 2 versions'))
	.pipe($.cleanCss())
	.pipe(gulp.dest(distFolder + "/css/"));
});


gulp.task('js', () => {
	return gulp.src(srcFolder + '/js/**/*.js')
	.pipe($.plumber())
	.pipe($.uglify())
	.pipe(gulp.dest(distFolder + "/js/"));
});

gulp.task('img', () => {
	return gulp.src(srcFolder + '/img/**/*')
	.pipe($.plumber())
	.pipe(
		$.if($.if.isFile, $.cache($.imagemin({
			progressive: true,
			interlaced: true,
			// don't remove IDs from SVGs, they are often used
			// as hooks for embedding and styling
			svgoPlugins: [{cleanupIDs: false}]
	}))))
	.pipe(gulp.dest(distFolder + '/img/'));
});

gulp.task('root', () => {
	return gulp.src([
		srcFolder + '/*.*',
		'!' + srcFolder + '/*.html'
	], {
		dot: true
	})
	.pipe($.plumber())
	.pipe(gulp.dest(distFolder));
});


gulp.task('bower', () => {
	return gulp.src(bowerFiles())
	.pipe($.plumber())
	.pipe(gulp.dest(distFolder + "/bower_components/"));
});

gulp.task('browser-sync', () => {
	browserSync({
		server: {
			baseDir: [distFolder],
		},
		port: 4000
	});
});

gulp.task('build', ['html', 'css', 'js', 'img', 'root', 'bower']);

gulp.task('dev', ['html', 'css', 'js', 'img', 'root', 'bower', 'browser-sync'], function() {
	$.watch(srcFolder + '/html/**/*.html', function() {
		gulp.start('html', function(){
			reload();
		});
	});
	$.watch([srcFolder + '/css/**/*.scss',srcFolder + 'css/**/*.css'], function() {
		gulp.start('css', function(){
			reload();
		});
	});
	$.watch(srcFolder + '/js/**/*.js', function() {
		gulp.start('js', function(){
			reload();
		});
	});
	$.watch(srcFolder + '/img/**/*', function() {
		gulp.start('img', function(){
			reload();
		});
	});
	$.watch(srcFolder + '/root/**/*', function() {
		gulp.start('root', function(){
			reload();
		});
	});
	$.watch(srcFolder + '/bower_components/**/*', function() {
		gulp.start('bower', function(){
			reload();
		});
	});
});
