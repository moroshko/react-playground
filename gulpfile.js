var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var express = require('express');
var livereload = require('gulp-livereload');
var htmlreplace = require('gulp-html-replace');
var eslint = require('gulp-eslint');
var shell = require('gulp-shell');

gulp.task('server', function() {
  // Set up an express server (but not starting it yet)
  var server = express();
  // Use our 'dist' folder as root folder
  server.use(express.static('./dist'));
  // Always return index.html
  server.all('*', function(req, res) {
    res.sendFile('index.html', { root: './dist' });
  });
  server.listen(8000);
  livereload.listen();
});

gulp.task('browserify:dev', function() {
  return gulp.src('src/app.js')
    .pipe(browserify({ transform: ['6to5ify', 'reactify'] }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('browserify:prod', function() {
  return gulp.src('src/app.js')
    .pipe(browserify({ transform: ['6to5ify', 'reactify'] }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('less:dev', function() {
  return gulp.src('src/app.less')
    .pipe(less())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('less:prod', function() {
  return gulp.src('src/app.less')
    .pipe(less())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-index:dev', function() {
  return gulp.src('src/index.html')
    .pipe(htmlreplace({
      livereload: [
        'http://localhost:35729/livereload.js?snipver=1'
      ]
    }))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('copy-index:prod', function() {
  return gulp.src('src/index.html')
    .pipe(htmlreplace({
      livereload: []
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('build:dev', ['browserify:dev', 'less:dev', 'copy-index:dev']);
gulp.task('build:prod', ['browserify:prod', 'test', 'less:prod', 'copy-index:prod']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['browserify:dev', 'test']);
  gulp.watch('src/**/*.less', ['less:dev']);
  gulp.watch('src/index.html', ['copy-index:dev']);
});

gulp.task('test', shell.task('npm test', { ignoreErrors: true }));

gulp.task('default', ['server', 'build:dev', 'watch']);
