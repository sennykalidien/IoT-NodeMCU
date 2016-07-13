var gulp = require('gulp'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cssnano = require('gulp-cssnano'),
  autoprefixer = require('gulp-autoprefixer')

// Styles
gulp.task('styles', function(cb) {
  return gulp.src([
      './public/src/css/reset.css',
      './public/src/css/main.css',
      './public/src/css/c3.min.css'
    ])
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./public/dist/css/'))
    .pipe(notify({
      message: 'styles task complete'
    }));
});

// Scripts
gulp.task('scripts', function(cb) {
  return gulp.src(['./public/src/js/script.js'])
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist/js/'))
    .pipe(notify({
      message: 'Scripts task complete'
    }));
});

// Default task
gulp.task('default', function() {
  gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function() {
  gulp.watch('./public/src/css/**/*.css', ['styles']);
  gulp.watch('./public/src/js/*.js', ['scripts']);
});
