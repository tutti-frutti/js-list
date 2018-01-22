var gulp = require('gulp'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    fileinclude = require('gulp-file-include'),
    spritesmith = require('gulp.spritesmith'),
    zip = require('gulp-zip'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('fileinclude', function () {
    return gulp.src('app/templates/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('less', function () {
    return gulp.src(['app/less/main.less', 'app/less/libs.less'])
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(less())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('scripts', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        'app/libs/owl.carousel/dist/owl.carousel.min.js',
        'app/libs/fontfaceobserver/fontfaceobserver.js',
        'app/libs/fancybox/dist/jquery.fancybox.min.js',
        'node_modules/selectric/public/jquery.selectric.min.js',
        'node_modules/unveil2/dist/jquery.unveil2.min.js',
        'node_modules/object-fit-images/dist/ofi.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['less'], function () {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/css'));
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    })
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlagins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('sprite', function () {
    var spriteData =
        gulp.src('./app/img/icons-cab/*.*') // путь, откуда берем картинки для спрайта
        .pipe(spritesmith({
            imgName: 'icons-cab-kit.png',
            cssName: 'icons-cab-kit.css',
        }));

    spriteData.img.pipe(gulp.dest('./app/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./app/css/')); // путь, куда сохраняем стили
});

gulp.task('zip', () =>
    gulp.src('dist/**/*')
        .pipe(zip('prodact.zip'))
        .pipe(gulp.dest('.'))
);


gulp.task('watch', ['browser-sync', 'css-libs', 'fileinclude', 'scripts'], function () {
    gulp.watch('app/templates/*.html', ['fileinclude']);
    gulp.watch('app/less/**/*.less', ['less']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'img', 'less', 'scripts'], function () {
    var buildCss = gulp.src([
       'app/css/main.css',
       'app/css/libs.min.css',
   ])
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**.*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**.*')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});