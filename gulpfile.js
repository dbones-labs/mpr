var gulp = require('gulp');
var ts = require('gulp-typescript');
var bump = require('gulp-bump');
var argv = require('yargs').argv;
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');


var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['prep'], function () { });

gulp.task('compile', function () {
    return tsProject.src()
        .pipe(tsProject());
});


gulp.task('test', ['compile'], function () {
    return gulp.src(['test/**/*.test.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec'
        }));
});

gulp.task('prep', ['prep-clean'], function () {
    return gulp.src(["src/**/*.js", "src/**/*.d.ts", "!gulpfile.js", "package.json", "readme.md"])
        .pipe(gulp.dest('dist'));
});


gulp.task('prep-clean', ['test'], function () {
   return gulp.src('dist', {read: false})
       .pipe(clean());
});

gulp.task('bump', ['prep'], function () {
    return gulp.src('./dist/package.json')
        .pipe(bump({ version: '1.0.' + argv.patch }))
        .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['bump'], function (done) {
    spawn('npm', ['publish', 'dist', '--access=public'], { stdio: 'inherit' }).on('close', done);
});

gulp.task('dev', function () {
    gulp.watch(['src/**', 'test/**'], ['test']);
});