var gulp = require("gulp");
var htmlclean = require("gulp-htmlclean");
var htmlmin = require("gulp-htmlmin");
var minifycss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");

// 压缩HTML
gulp.task("minify-html", function() {
    return gulp.src("./public/**/*.html")
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,     // 删除页面注释
            collapseWhitespace: true, // 删除页面空格
            minifyJS: true,           // 压缩页面JS
            minifyCSS: true,          // 压缩页面CSS
            minifyURLs: true          // 压缩页面URL
        }))
        .pipe(gulp.dest("./public"))
});
// 压缩CSS
gulp.task("minify-css", function() {
    return gulp.src(["./public/**/*.css", "!./public/**/*.min.js"])
        .pipe(minifycss({
            compatibility: "ie8" // 采用兼容IE8的压缩算法
        }))
        .pipe(gulp.dest("./public"));
});
// 压缩JS
gulp.task("minify-js", function() {
    return gulp.src(["./public/**/*.js", "!./public/**/*.min.js"])
        .pipe(uglify())
        .pipe(gulp.dest("./public"));
});
// 压缩图片
gulp.task("minify-images", function() {
    return gulp.src("./public/images/features/*.*")
        .pipe(imagemin(
        [imagemin.gifsicle({"optimizationLevel": 3}), // 压缩GIF图片：优化等级为3（范围1-3）
         imagemin.mozjpeg({"quality": 90}),           // 压缩JPG图片：压缩质量为90（范围0-100）
         imagemin.optipng({"optimizationLevel": 7}),  // 压缩PNG图片：优化等级为7（范围0-7）
         imagemin.svgo()],
        {"verbose": true}))
        .pipe(gulp.dest("./public/images/features/"))
});
// 执行Gulp任务
gulp.task("default", gulp.parallel(
    "minify-html", "minify-css", "minify-js", "minify-images"
));
