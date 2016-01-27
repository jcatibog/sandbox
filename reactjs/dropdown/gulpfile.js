var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

gulp.task('default', function () {
    var bundler = watchify(browserify({
        entries: ['./src/app.jsx'],
        extensions: ['.jsx'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }).transform(babelify, { presets: ['es2015','react'] }));

    function build(file) {
        if (file) gulpUtil.log('Recompiling ' + file);
        return bundler.bundle()
            .on('error', gulpUtil.log.bind(gulpUtil, 'Browserify Error'))
            .pipe(source('build.js'))
            .pipe(gulp.dest('./'));
    }

    build();
    bundler.on('update', build);
});

// return gulp.src('src/**')
//            .pipe(babel({ presets: ['es2015','react'] }))
//            .pipe(concat('build.js'))
//            .pipe(gulp.dest('./'))
