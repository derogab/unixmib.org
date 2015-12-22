import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import bowerFiles from 'main-bower-files'

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const srcFolder = "src/";
const distFolder = "dist/";


gulp.task('html', () => {
	 $.nunjucksRender.nunjucks.configure(srcFolder + "html/", {watch: false }); 
	return gulp.src([ srcFolder + 'html/**/*.html','!' + srcFolder + 'html/_nunjucks/**/*' ])
	 .pipe($.nunjucksRender()) 
  .pipe($.inject(gulp.src('bower_components/**/*', {read: false, cwd: "./" + distFolder}), {name: 'bower', addRootSlash: false}))
  .pipe($.inject(gulp.src('css/*.css', {read: false, cwd: "./" + distFolder}), {addRootSlash: false}))
  .pipe($.inject(gulp.src('js/**/*.js', {read: false, cwd: "./" + distFolder}), {addRootSlash: false}))
  .pipe($.minifyHtml())
  .pipe(gulp.dest('./' + distFolder));
});

gulp.task('css', () => {
	 return gulp.src('./' + srcFolder + 'css/style.scss')
  .pipe($.plumber())
  .pipe($.sass( {includePaths: require('node-neat').includePaths} ).on('error', $.sass.logError))
  .pipe($.autoprefixer('last 2 versions'))
  .pipe($.minifyCss())
  .pipe(gulp.dest('./' + distFolder + "css/"));
});


gulp.task('js', () => {
	return gulp.src('./' + srcFolder + 'js/**/*.js')
    .pipe($.plumber())
  	.pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .on('error', $.notify.onError)
    .pipe($.uglify())
  	.pipe(gulp.dest('./' + distFolder + "js/"));
});

gulp.task('img', () => {
  return gulp.src('./' + srcFolder + 'img/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('./' + distFolder + 'img/'));
});

gulp.task('root', () => {
  return gulp.src([
    './' + srcFolder + '*.*',
    '!./' + srcFolder + '*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('./'+distFolder));
});


gulp.task('bower', () => {
  return gulp.src(bowerFiles())
  .pipe(gulp.dest('./' + distFolder + "bower_components/"));
});

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: ['./'+distFolder],
    },
    port: 4000
  });

  $.watch("./" + distFolder + "/**/*").on('change', reload);
});


gulp.task('default', ['browser-sync', 'html','css','js','img', 'root'], function() {
    
    
    $.watch('./src/html/**/*.html', function() {
      gulp.start('html');
    });

    $.watch(['./src/css/**/*.scss','./src/css/**/*.css'], function() {
      gulp.start('css');
    });

    $.watch('./src/js/**/*.js', function() {
      gulp.start('js');
    });

    $.watch('./src/img/**/*', function() {
      gulp.start('img');
    });

    $.watch('./src/root/**/*', function() {
      gulp.start('root');
    });

     $.watch('./src/bower_components/**/*', function() {
      gulp.start('bower');
    });
});
