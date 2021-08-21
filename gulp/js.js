import gulp from 'gulp';
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

export const js = () =>
  gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(terser())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
