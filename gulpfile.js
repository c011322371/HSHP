//---------------------------------------------------------------------
// common variable
//---------------------------------------------------------------------
var gulp = require("gulp"),
  path = require('path'),
  rename = require('gulp-rename');

//---------------------------------------------------------------------
// js minimize
//---------------------------------------------------------------------
var uglify = require('gulp-uglify'),
  plumber = require("gulp-plumber");

gulp.task('js', function () {
  gulp.src([path.join('./src/', 'js/*.js'), path.join('!', './src/', 'js/*.min.js')])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(path.join('./dist/', 'js/min/')));
});

//---------------------------------------------------------------------
// sass
//---------------------------------------------------------------------
var sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  browser = require("browser-sync");

gulp.task("sass", function () { //taskの登録
  gulp.src("./src/sass/**/*scss") //ファイル指定
    .pipe(plumber())
    .pipe(sass()) //srcで取得したファイルに処理を施す
    .pipe(autoprefixer()) //ベンダープレフィックス付与を自動化
    .pipe(gulp.dest("./dist/css")) //出力先に処理を施したファイルを出力
    .pipe(browser.reload({ stream: true }))
});

//---------------------------------------------------------------------
// ejs
//---------------------------------------------------------------------
var ejs = require("gulp-ejs");
var jsonData = require('./src/json/data.json');

gulp.task("ejs", function () {
  gulp.src(
    ["./src/ejs/**/index.ejs", '!' + "./src/ejs/**/_*.ejs"] //参照するディレクトリ、出力を除外するファイル
  )
    .pipe(plumber())
    .pipe(ejs({
      jsonData: jsonData //jsonData に data.json を取り込む
    }))
    .pipe(rename({ extname: ".html" })) //拡張子をhtmlに
    .pipe(gulp.dest("./dist/")) //出力先
});

//---------------------------------------------------------------------
// web-server
//---------------------------------------------------------------------

var webserver = require('gulp-webserver');

gulp.task('webserver', function () {
  gulp.src('./dist')
    .pipe(webserver({
      livereload: true
    }));
});

//---------------------------------------------------------------------
// default
//---------------------------------------------------------------------

gulp.task("default", ['webserver'], function () {
  // gulp.watch("./src/ejs/**/**.ejs", ["ejs"]);
  gulp.watch("./src/sass/**/*.scss", ["sass"]);
  gulp.watch([path.join('./src/', 'js/*.js'), path.join('!', './src/', 'js/*.min.js')], ['js']);
});
