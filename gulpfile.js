var gulp = require("gulp");
var uglify = require("gulp-uglify");
var typescript = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var merge2 = require("merge2");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var cleants = require('gulp-clean-ts-extends');
var changed = require('gulp-changed');
var runSequence = require('run-sequence');
var replace = require("gulp-replace");
var webserver = require('gulp-webserver');

/*
Compiles all typescript files and creating a declaration file.
*/
gulp.task('default', ["typescript-sourcemaps"], function () {
    var tsResult = gulp.src("*.ts")
                  .pipe(typescript({
                      noExternalResolve: true,
                      target: 'ES5',
                      declarationFiles: true,
                      typescript: require('typescript')
                  }));
    return merge2([
        tsResult.dts
            .pipe(concat("MicrosoftGraph.d.ts"))
            .pipe(gulp.dest("dist")),
        tsResult.js
            .pipe(gulp.dest("dist"))
    ]);
});

gulp.task('typescript-sourcemaps',['move-html'], function () {
    var tsResult = gulp.src("*.ts")
                .pipe(sourcemaps.init()) // sourcemaps init. currently redundant directory def, waiting for this - https://github.com/floridoo/gulp-sourcemaps/issues/111
                .pipe(typescript({
                    noExternalResolve: true,
                    target: 'ES5',
                    declarationFiles: true,
                    typescript: require('typescript')
                }));
    return tsResult.js
            .pipe(sourcemaps.write("./")) // sourcemaps are written.
            .pipe(gulp.dest("dist"));
});

/**
 * Watch task, will call the default task if a js file is updated.
 */
gulp.task('watch', function () {
    gulp.watch("*.ts", ['default']);
});

gulp.task('move-html', function() {
    var result = gulp.src(['index.html','login.html'])
        .pipe(gulp.dest('./dist'));
    return result;
});