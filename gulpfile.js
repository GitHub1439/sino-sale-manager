let gulp = require('gulp')
let rename = require('gulp-rename')
let del = require('del')
let env = process.env.env_config // 运行环境

gulp.task('copy', () => {
    return gulp.src(`dist/setting/index-${env}.js`)
        .pipe(rename('index.js'))
        .pipe(gulp.dest('dist/config'))
})


gulp.task('default', gulp.series('copy', () => {
    return del(['dist/setting']) // 删除文件夹
}))
