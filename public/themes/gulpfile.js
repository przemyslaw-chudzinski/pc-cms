const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const minifyCSS = require('gulp-minify-css');

const CONFIG = {
    sass: {
        inputFile: './scss/main.scss',
        outputDir: './css',
        watchFiles: './scss/**/*.scss'
    },
    js: {
      outputDir: './js/dist',
      watchFiles: './js/*.js'
    }
};


const cssFiles = [
  'css/main.css',
  'node_modules/font-awesome/css/font-awesome.min.css'
];

const jsFiles = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/popper.js/dist/umd/popper.min.js',
  'node_modules/bootstrap/js/dist/util.js',
  'node_modules/bootstrap/js/dist/tooltip.js',
  'node_modules/wowjs/dist/wow.min.js',
  'js/jquery.transit.min.js',
  'js/parallax.min.js',
  'js/scripts.js'
];

gulp.task('sass:build', () => {
    return gulp.src(CONFIG.sass.inputFile)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
        }))
        .pipe(gulp.dest(CONFIG.sass.outputDir));
});

gulp.task('concatCSS', () => {
  return  gulp.src(cssFiles)
    .pipe(concatCss('main.css'))
    .pipe(gulp.dest(CONFIG.sass.outputDir));
});

gulp.task('minify-css', () => {
  return gulp.src('./css/main.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest(CONFIG.sass.outputDir));
});

gulp.task('sass', ['sass:build', 'concatCSS', 'minify-css']);

gulp.task('concatJS', () => {
  return gulp.src(jsFiles)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(CONFIG.js.outputDir));
});

gulp.task('javascript', ['concatJS']);

gulp.task('javascript:watch', () => {
    gulp.watch(CONFIG.js.watchFiles, ['javascript']);
});

gulp.task('sass:watch', () => {
    gulp.watch(CONFIG.sass.watchFiles, ['sass']);
});

gulp.task('dev', ['sass', 'javascript']);

gulp.task('dev:watch', ['sass:watch', 'javascript:watch']);
