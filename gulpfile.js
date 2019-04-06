var gulp = require('gulp');
var ts = require('gulp-typescript');
var bump = require('gulp-bump');
var argv = require('yargs').argv;
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');


var tsProject = ts.createProject('tsconfig.json');
var tsProjectAmd = ts.createProject('tsconfig.amd.json');
var tsProjectSystem = ts.createProject('tsconfig.system.json');

gulp.task('clean', () => {
    return gulp.src('./dist', { read: false,  allowEmpty: true })
        .pipe(clean());
});

gulp.task('compile', gulp.series("clean", () => {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest('./'));
}));

gulp.task('compile-system', gulp.series("clean", () => {
    return tsProjectSystem.src()
        .pipe(tsProjectSystem())
        .pipe(gulp.dest('./dist/system'));
}));

gulp.task('compile-amd', gulp.series('compile-system', () => {
    return tsProjectAmd.src()
        .pipe(tsProjectAmd())
        .pipe(gulp.dest('./dist/amd'));
}));

gulp.task('test', gulp.series('compile', () => {
    return gulp.src(['test/**/*.test.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec'
        }));
}));

gulp.task('prep-commonjs', gulp.series('test', () => {
    return gulp.src(["src/**/*.js", "src/**/*.d.ts", "!gulpfile.js"])
        .pipe(gulp.dest('./dist'));
}));

gulp.task('prep', gulp.series('prep-commonjs', () => {
    return gulp.src(["package.json", "readme.md"])
        .pipe(gulp.dest('dist'));
}));

gulp.task('bump', gulp.series('prep', () => {
    return gulp.src('./dist/package.json')
        .pipe(bump({ version: '1.1.' + argv.patch }))
        .pipe(gulp.dest('dist'));
}));

gulp.task('deploy', gulp.series('bump', (done) => {
    spawn('npm', ['publish', 'dist', '--access=public'], { stdio: 'inherit' }).on('close', done);
}));

gulp.task('dev', () => {
    gulp.watch(['src/**', 'test/**'], ['test']);
});

gulp.task('default', gulp.series('prep', () => { }));