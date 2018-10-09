const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const scripts = require('./scripts');
const styles = require('./styles');

var devMode = false;

gulp.task('css', () =>{
    gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('js', () =>{
    gulp.src(scripts)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', () =>{
    gulp.src('./src/views/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
    }));
});

gulp.task('json', () =>{
    gulp.src('./src/models/**/*.*')
        .pipe(gulp.dest('./dist/models'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('build', () =>{
    gulp.start(['css', 'js', 'html', 'json']);
});

gulp.task('browser-sync', () =>{
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('start', () => {
    devMode = true;
    gulp.start(['build', 'browser-sync']);
    gulp.watch(['./src/styles/**/*.css'], ['css']);
    gulp.watch(['./src/scripts/**/*.js'], ['js']);
    gulp.watch(['./src/views/**/*.html'], ['html']);
    gulp.watch(['./src/models/**/*.json'], ['json']);
});