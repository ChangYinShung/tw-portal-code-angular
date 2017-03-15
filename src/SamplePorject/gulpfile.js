/// <binding AfterBuild='default' ProjectOpened='default' />
var gulp = require("gulp");
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var paths = {
  'dev': ['./wwwroot/dev/**.js']
};
var gulpCopy = require('gulp-copy');


gulp.task('default', ['uncompress', 'compress']);

gulp.task('compress', function () {
  return gulp.src(paths.dev).pipe(ngAnnotate()).pipe(uglify()).pipe(concat('twProtalCode.directive.min.js')).pipe(gulp.dest('./wwwroot/dist')).pipe(gulpCopy('../../dist', { prefix: 3 }));
});
gulp.task('uncompress', function () {
  return gulp.src(paths.dev).pipe(ngAnnotate()).pipe(concat('twProtalCode.directive.js')).pipe(gulp.dest('./wwwroot/dist')).pipe(gulpCopy('../../dist', { prefix: 3 }));
});


