const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsp = ts.createProject("tsconfig.json");
const exec = require('child_process').exec;

let child;
// 目录常量
const PATHS = {
    script: [
        './src/**/*.ts'
    ],
    output: './dist',
};

// 编译ts
gulp.task('build-ts', ['restart'], function() {
    return gulp.src(PATHS.script)
        .pipe(tsp())
        .pipe(gulp.dest(PATHS.output));
});

// 监视TS文件变化
gulp.task('watch-ts', ['build-ts'], function() {
    gulp.watch(PATHS.scripts, ['build-ts']);
});

// 自动重启服务器
gulp.task('restart', function() {
    child = exec(
        'node ./dist/server.js',
        (err, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (err !== null) {
                console.log(`exec error: ${error}`);
            }
        }
    )
});

// 开发任务
gulp.task('default', ['build-ts', 'restart', 'watch-ts']);