import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemap from 'gulp-sourcemaps';
import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import del from 'del';
import htmlmin from 'gulp-htmlmin';
import babel from 'gulp-babel';
import terser from 'gulp-terser';

const sass = gulpSass(nodeSass);
browserSync.create();

// Styles

export const styles = () =>
  gulp.src('src/sass/style.sass')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());

// Clean

export const clean = () => del('build');

// Copy

export const copy = () =>
  gulp.src([
    'src/fonts/**/*.{woff,woff2}',
    'src/img/**',
    'src/*.ico'
  ], {base: 'src'})
    .pipe(gulp.dest('build'));

// HTML

export const html = () =>
  gulp.src('src/*.html', {base: 'src'})
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());

// JS

export const js = () =>
  gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(terser())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());

export const build = gulp.series(
  clean,
  copy,
  styles,
  html,
  js,
);

// Server

export const server = (done) => {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Watcher

export const watcher = () => {
  gulp.watch('src/sass/**/*.sass', gulp.series('styles'));
  gulp.watch('src/*.html', gulp.series('html'));
  gulp.watch('src/js/*.js', gulp.series('js'));
};

export default gulp.series(
  build,
  server,
  watcher,
);
