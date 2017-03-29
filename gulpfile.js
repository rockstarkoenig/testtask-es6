var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');

// SASS
gulp.task('build-sass', function (){
    gulp.src(['./src/sass/*.scss', '!./src/sass/_variables.scss'])
        .pipe(sass({
            includePaths: ['./src/sass'],
            outputStyle: 'expanded'
        }))
        .pipe(prefix(
            "last 1 version", "> 1%", "ie 8", "ie 7"
        ))
        .pipe(gulp.dest('./src/css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./build/css'));
});

// ES6
gulp.task('build-es6', function () {
    return browserify({entries: './src/es6/Main.es6', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('Main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build/js'))
});

// WATCH
gulp.task('watch', ['build-sass', 'build-es6'], function () {
    // livereload.listen();
    gulp.watch('./src/sass/*.scss', ['build-sass']);
    gulp.watch('./src/es6/*.es6', ['build-es6']);
});

gulp.task('default', ['build-sass', 'build-es6']);
