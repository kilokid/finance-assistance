import gulp from 'gulp';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';

const webpackConfig = {
  mode: 'production',
  entry: {
    script: './src/js/script.js',
  },
  output: {
    filename: '[name].min.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

export const js = () =>
  gulp.src('src/js/**/*.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
