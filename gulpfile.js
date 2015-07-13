var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var minimist = require('minimist');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var sh = require('shelljs');

var argv = minimist(process.argv.slice(2));

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

var replaceFiles = ['./www/js/app.js'];
var replaceDir = './www/js/';
gulp.task('remove-proxy', function(){
  gulp.src(replaceFiles)
      .pipe(replace(/('AtmBaseUrl'\s*,\s*)''/g, "$1'https://co-opcreditunions.org/wp-content/themes/coop019901/inc'"))
      .pipe(gulp.dest(replaceDir));
});

gulp.task('add-proxy', function(){
  gulp.src(replaceFiles)
      .pipe(replace(/('AtmBaseUrl'\s*,\s*)'https:\/\/co-opcreditunions\.org.+'/g, "$1''"))
      .pipe(gulp.dest(replaceDir));
});

gulp.task('add-bingkey', function(){
  gulp.src(replaceFiles)
      .pipe(replace(/('BingApiKey'\s*,\s*)''/g, "$1'" + argv.key + "'"))
      .pipe(gulp.dest(replaceDir));
});

gulp.task('remove-bingkey', function(){
  gulp.src(replaceFiles)
      .pipe(replace(/('BingApiKey'\s*,\s*)'.*'/g, "$1''"))
      .pipe(gulp.dest(replaceDir));
});
