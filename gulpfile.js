// gulp
const { src, dest, series } = require('gulp');

const gulp = require('gulp');

const mediaQueriesSplitter = require('gulp-media-queries-splitter');
const cleanCss = require('gulp-clean-css');

// npm package
const path = require('path');

// path object
const paths = {
  css_dist: 'dist/css',
};

// split css
function removeMediaQuery(cb) {
  return src(path.resolve(paths.css_dist, 'web-timeline-editor.css'))
    .pipe(mediaQueriesSplitter([{ media: 'none', filename: 'web-timeline-editor-base.css' }]))
    .pipe(dest(paths.css_dist));
}

// minify css
function minifyCss(cb) {
  let cleanCssOption = {
    level: {
      2: {
        mergeSemantically: true,
        overrideProperties: false,
        mergeIntoShorthands: false,
      },
    },
  };
  return src(path.join(paths.css_dist, '*.css')).pipe(cleanCss(cleanCssOption)).pipe(dest(paths.css_dist));
}

exports.build = series(removeMediaQuery, minifyCss);
