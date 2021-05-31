"use strict";

const { src, dest, watch, parallel, series } = require("gulp");

const gulp = require("gulp");
const sass = require("gulp-sass");
const sync = require("browser-sync").create();

function generateCSS(cb) {
  src("src/styles/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("build/css/"))
    .pipe(sync.stream());
  cb();
}

function updateHtml(cb) {
  src("./**.html")
    .pipe(dest("build/"))
    .pipe(sync.stream());
  cb();
}

function updateJs(cb) {
  src("./src/scripts/**.**")
    .pipe(dest("build/scripts/"));
  cb();
}

function browserSync(cb) {
  sync.init({
    server: {
      baseDir: "./",
    },
    browser: "firefox",
  });

  watch("src/styles/**.scss", generateCSS);
  watch("./**.html", updateHtml);
  watch("src/scripts/**.js", updateJs);
  
}
function watchFiles(cb) {
  watch("src/styles/**.scss", generateCSS);
}

function initProject(cb) {
  browserSync();
}

function updateAlliles() {
  src("./**.**").pipe(dest("build/"));

  src("./src/fonts/**.**").pipe(dest("build/fonts/"));

  src("./src/img/**.**").pipe(dest("build/img/"));

  src("./src/scripts/**.**").pipe(dest("build/scripts/"));
}

exports.css = generateCSS;
exports.watch = watchFiles;
exports.init = browserSync;
exports.build = updateAlliles;

exports.default = series(parallel(generateCSS));
