var gulp = require('gulp');
var ts = require('gulp-typescript');
var bump = require('gulp-bump');
var argv = require('yargs').argv;
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');


var tsProject = ts.createProject('tsconfig.json');
var tsProjectAmd = ts.createProject('tsconfig.amd.json');
var tsProjectSystem = ts.createProject('tsconfig.system.json');

gulp.task('default', ['prep'], function () { });

gulp.task('compile', function () {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest('./'));
});

gulp.task('compile-amd', ['compile-system'], function () {
    return tsProjectAmd.src()
        .pipe(tsProjectAmd())
        .pipe(gulp.dest('./dist/amd'));
});

gulp.task('compile-system', ["clean"], function () {
    return tsProjectSystem.src()
        .pipe(tsProjectSystem())
        .pipe(gulp.dest('./dist/system'));
});


gulp.task('test', ['compile'], function () {
    return gulp.src(['test/**/*.test.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec'
        }));
});

gulp.task('prep', ['prep-commonjs'], function () {
    return gulp.src(["package.json", "readme.md"])
        .pipe(gulp.dest('dist'));
});

gulp.task('prep-commonjs', ['test'], function () {
    return gulp.src(["src/**/*.js", "src/**/*.d.ts", "!gulpfile.js"])
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
     });

gulp.task('bump', ['prep'], function () {
    return gulp.src('./dist/package.json')
        .pipe(bump({ version: '1.1.' + argv.patch }))
        .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['bump'], function (done) {
    spawn('npm', ['publish', 'dist', '--access=public'], { stdio: 'inherit' }).on('close', done);
});

gulp.task('dev', function () {
    gulp.watch(['src/**', 'test/**'], ['test']);
});