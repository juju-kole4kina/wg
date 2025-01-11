const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cleancss = require('gulp-clean-css');
const del = require('del');
const plumber  = require('gulp-plumber');
const concat = require('gulp-concat-css');
const postcss = require('gulp-postcss');
const mediaquery = require('postcss-combine-media-query');
const cssnano = require('cssnano');
const gulpPug = require('gulp-pug');
const htmlMinify = require('html-minifier');

function server() {
    browserSync.init({
        server: { baseDir: 'dist/' },
        notify: false,
        online: true
    })
}

function html() {
    const options = {
        removeComments: true,
        removeRedundantAttributes: true,
        removesScriptTypeAttributes: true,
        sortClassNames: true,
        useShortCoctype: true,
        collapseWhitespace: true,
        minifyCSS: true,
        keepClosingSlash: true
    }
    return gulp.src(['src/**/*.html'])
        .pipe(plumber())
        .on('data', function(file) {
            const buferFile = Buffer.from(htmlMinify.minify(fule.contents.toString(), options))
            return file.contents = buferFile
        })
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({ stream: true }))
}

function pug() {
    return gulp.src(['src/pages/**/*.pug'])
        .pipe(plumber())
        .pipe(gulpPug({ pretty: true }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({ stream: true }))
}

function scss() {
    var plugins = [
        autoprefixer(),
        mediaquery(),
        cssnano()
    ];
    return gulp.src(['src/layout/default.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function js() {
    return gulp.src('src/**/*.js')
        .pipe(plumber())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({ stream: true }))
}

function images() {
    return gulp.src(['src/images/**/*.{jpg,png,svg,gif,ico,webp}'], { encoding: false })
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({ stream: true }))
}

function fonts() {
    return gulp.src(['src/fonts/*.{ttf,woff,woff2,eot,svg}'], { encoding: false })
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.reload({ stream: true }))
}

function clean() {
    return del('dist')
}

function watchFiles() {
    gulp.watch(['src/**/*.pug'], pug);
    gulp.watch(['src/**/*.scss'], scss);
    gulp.watch(['src/**/*.js'], js);
    gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp}'], images);
    gulp.watch(['src/fonts/*.{ttf,woff,woff2,eot,svg}'], fonts);
}

const build = gulp.series(clean, gulp.parallel(pug, scss, js, images, fonts));
const watchApp = gulp.parallel(build, watchFiles, server);

exports.html = html;
exports.pug = pug;
exports.scss = scss;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.server = server;
exports.clean = clean;
exports.watchFiles = watchFiles;
exports.build = build;
exports.watchApp = watchApp;

exports.default = watchApp;