/*eslint-env node */
'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));
var htmlmin = require('gulp-html-minifier');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var angularFilesort = require('gulp-angular-filesort');


var paths = {
  index: 'src/*.html',
  src: 'src',
  tmp: '.tmp',
  sass: 'src/**/*.scss',
  js: ['src/**/*.js', '!src/**/*.spec.js'],
  html: 'src/**/*.html',
  assets: 'src/assets/**',
  assetsOther: ['src/**/*.ico'],
  components: ['src/components/**/*', '!src/components/**/*.{scss,js,css}'],
  section: ['src/section/**/*', '!src/section/**/*.{scss,js,css}'],
  bowerCmp: 'bower_components',
  prod: 'build/dist.prod'
};

// function for configuringing browserSync
function browserSyncInit(baseDir) {
  browserSync.init({
    startPath: '/',
    server: {
      baseDir: baseDir,
      routes: {
        "/bower_components": "bower_components"
      }
    }
  });
}


gulp.task('inject', ['lint', 'sass'], function() {
  var injectStyles = gulp.src([paths.tmp+'/**/*.css'], {read: false});
  var injectScripts = gulp.src(paths.js).pipe(angularFilesort());
  var injectConfig = {addRootSlash: false, ignorePath: ['src', '.tmp']};

  return gulp.src(paths.index)
    .pipe(inject(injectStyles, injectConfig))
    .pipe(inject(injectScripts, injectConfig))
    .pipe(wiredep({}))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('inject:prod', ['sass'], function() {
  var injectStyles = gulp.src([paths.prod+'/**/*.css'], {read: false});
  var injectScripts = gulp.src(paths.js).pipe(angularFilesort());
  var injectConfig = {addRootSlash: false, ignorePath: ['src', paths.prod]};

  return gulp.src(paths.index)
    .pipe(inject(injectStyles, injectConfig))
    .pipe(inject(injectScripts, injectConfig))
    .pipe(wiredep({}))
    .pipe(useref())
    .pipe(gulp.dest(paths.prod));
});

gulp.task('uglify:prod', ['inject:prod'], function() {
  return gulp.src(paths.prod+'/scripts/*.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(paths.prod+'/scripts/'));
});

gulp.task('minifyHtml', ['clean:prod',
  'copy:assets',
  'copy:assetsOther',
  'copy:components',
  'copy:section',
  'sass:prod',
  'inject:prod',
  'uglify:prod'], function() {
  return gulp.src(paths.prod+'/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.prod));
});

gulp.task('sass', function() {
  return gulp.src([paths.sass])
    .pipe(sass({}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(paths.tmp+'/css'));
});

gulp.task('sass:prod', function() {
  return gulp.src([paths.sass])
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(paths.prod));
});

gulp.task('copy:assets', function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.prod+'/assets/'));
});

gulp.task('copy:components', function () {
  return gulp.src(paths.components)
    .pipe(gulp.dest(paths.prod+'/components/'));
});

gulp.task('copy:section', function () {
  return gulp.src(paths.section)
    .pipe(gulp.dest(paths.prod+'/section/'));
});

gulp.task('copy:assetsOther', function () {
  return gulp.src(paths.assetsOther)
    .pipe(gulp.dest(paths.prod));
});

gulp.task('clean:dev', function() {
  return del.sync([
    paths.tmp+'/**/*'
  ]);
});

gulp.task('clean:prod', function() {
  return del.sync([
    paths.prod+'/**/*'
  ]);
});

gulp.task('lint', function () {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});


// run browser sync in development mode
gulp.task('serve', [], function () {
  var baseDir = [paths.tmp, paths.src];
  browserSyncInit(baseDir);
});

gulp.task('watch:dev', [
  'clean:dev',
  'sass',
  'inject',
  'serve'
], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['lint', 'inject']);

  gulp.watch([
    paths.js,
    paths.tmp+'/**/*',
    paths.html]).on('change', browserSync.reload);
});

gulp.task('build:prod', [
  'clean:prod',
  'copy:assets',
  'copy:assetsOther',
  'copy:components',
  'copy:section',
  'sass:prod',
  'inject:prod',
  'uglify:prod',
  'minifyHtml'
  ]);

gulp.task('build:dev', [
  'clean:dev',
  'sass',
  'inject',
  'watch:dev'
  ]);

gulp.task('default', ['build:dev']);



gulp.task('deploy', function() {
  var remotePath = '/EventPlanner/';
  var conn = ftp.create({
    host: 't7lab.com',
    user: args.user,
    password: args.password,
    log: gutil.log
  });

  gulp.src([paths.prod+'/**/*'])
    .pipe(conn.newer(remotePath))
    .pipe(conn.dest(remotePath));
});
