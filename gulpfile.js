const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  postcss = require('gulp-postcss'),
  minify = require('gulp-clean-css'),
  browserSync = require('browser-sync').create(),
  sassdoc = require('sassdoc'),
  sass = require('gulp-sass');

// Static server & watch scss + html files
gulp.task('watch', ['sass'], function () {
  browserSync.init({
    server: '.'
  });
  gulp.watch('./scss/**/*.scss', ['sass'], browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./assets/js/**/*.js', browserSync.reload);
});

// Compile Sass into CSS & inject into browsers
gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
.pipe(sass().on('error', sass.logError))
.pipe(autoprefixer({
  browsers: ['last 2 versions'],
  cascade: false
}))
.pipe(postcss([ require('autoprefixer') ]))
.pipe(minify())
.pipe(sass({
  outputStyle: 'compressed',
  includePaths: ['scss/partials/vendor/susy/sass']
}).on('error', sass.logError))
.pipe(gulp.dest('./assets/css'))
.pipe(browserSync.stream());
});

// generate the documentation
gulp.task('sassdoc', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sassdoc());
});

// default will also watch
gulp.task('default', ['watch']);
