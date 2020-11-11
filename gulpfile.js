const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();


function convertSass(done) {
  gulp.src('./scss/**/*.scss') // sass source любой файл
    .pipe(sourcemaps.init()) // !!!!!!!
    .pipe(sass({ // компиляция scss
      errorLogConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      // browsers: ['last 2 versions'], // хз надо ли
      cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./')) // !!!!!!!
    .pipe(gulp.dest('./css/')) // куда компилируется sass
    .pipe(browserSync.stream())

  done();
}

function printHi(done) {
  console.log('hi')
  done();
}

function sync(done) {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000
  })
  done();
}

// gulp.task(convertSass); // по одной таске вручную
// gulp.task(printHi);


function watchComp() {
  gulp.watch("./scss/**/*", convertSass); // обновление любого файла в папке scss будет вызывать компиляцию
}

gulp.task('default', gulp.parallel(sync, watchComp)); // все таски сразу вручную
gulp.task(sync)

// другой способ

// function test(done) {
//   console.log('Gulp is working!');
//   done();
// }
//
// exports.default = test;
