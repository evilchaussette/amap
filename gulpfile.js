'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var concat = require('gulp-concat');

gulp.task('default', ['sass', 'scripts', 'watch'], function() {

});

//Lance le serveur sous 127.0.0.1:3000
gulp.task('serve', function() {
	exec('php bin/console server:start', function(err, stdout, stderr) {
		console.log(stdout);
	});
});

//Lance le rafraichissement automatique du navigateur
gulp.task('browserSync', ['serve'], function() {
  browserSync.init([
  	'app/Resources/assets',
    'app/Resources/views'
  ], {
  	proxy: '127.0.0.1:8000'
  });
})
 
//Compile les fichiers sass en un fichier css
gulp.task('sass', ['browserSync'], function() {
  return gulp.src('./app/Resources/assets/sass/application.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./web/styles'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//Relance automatiquement la compilation si un fichier sass est modifié
gulp.task('watch', function() {
  gulp.watch('./app/Resources/assets/sass/*.scss', ['sass']);
});

//Concatène les fichiers javascript
gulp.task('scripts', function() {
  return gulp.src('./app/Resources/assets/vendor/angular/angular.min.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./web/scripts'));
});