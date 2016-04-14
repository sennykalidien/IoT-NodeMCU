var gulp = require('gulp'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cssnano = require('gulp-cssnano'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  svgmin = require('gulp-svgmin'),
  cssnext = require('cssnext'),
  mqpacker = require('css-mqpacker'),
  csswring = require('csswring'),
  responsive = require('gulp-responsive'),
  imgConfig = [{
    width: 1500,
    rename: {
      suffix: '-1500'
    }
  }, {
    width: 1280,
    rename: {
      suffix: '-1280'
    }
  }, {
    width: 960,
    rename: {
      suffix: '-960'
    }
  }, {
    width: 640,
    rename: {
      suffix: '-640'
    }
  }, {
    width: 480,
    rename: {
      suffix: '-480'
    }
  }];

gulp.task('icons', function() {
  return gulp.src('public/src/img/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('public/dist/img'));
});

// Styles
gulp.task('styles', function(cb) {
  var processors = [
    autoprefixer({
      browsers: ['> 10%', 'IE 11']
    }),
    //        mqpacker,
    csswring,
    cssnext()
  ];
  return gulp.src([
      './public/src/css/base.css',
      './public/src/css/c3.min.css'
    ])
    .pipe(concat('style.css'))
    .pipe(postcss(processors))
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
