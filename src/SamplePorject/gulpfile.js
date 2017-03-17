/// <binding AfterBuild='default' ProjectOpened='dev' />
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var ngAnnotate = require('gulp-ng-annotate');
var angularOrder = require('gulp-angular-filesort');
var paths = {
  'dev': ['./wwwroot/dev/**.js']
};
var gulpCopy = require('gulp-copy');


gulp.task('default', ['uncompress', 'compress']);
gulp.task('dev',['uncompress','watch'])

gulp.task('compress', function () {
  return gulp.src(paths.dev).pipe(ngAnnotate()).pipe(angularOrder()).pipe(uglify()).pipe(concat('twProtalCode.min.js')).pipe(gulp.dest('./wwwroot/dist')).pipe(gulpCopy('../../dist', { prefix: 3 }));
});
gulp.task('uncompress', function () {
  return gulp.src(paths.dev).pipe(ngAnnotate()).pipe(angularOrder()).pipe(concat('twProtalCode.js')).pipe(gulp.dest('./wwwroot/dist')).pipe(gulpCopy('../../dist', { prefix: 3 }));
});
gulp.task('watch', function () {
  return watch(paths.dev, function () {
    gulp.src(paths.dev).pipe(plumber()).pipe(ngAnnotate()).pipe(angularOrder()).pipe(concat('twProtalCode.js')).pipe(gulp.dest('./wwwroot/dist')).pipe(gulpCopy('../../dist', { prefix: 3 }));

  });
});


