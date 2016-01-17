'use strict';

const gulp = tars.packages.gulp;
const runSequence = tars.packages.runSequence.use(gulp);

/**
 * Build dev-version (without watchers)
 */
module.exports = () => {
    return gulp.task('main:build-dev', cb => {
        tars.options.notify = false;

        runSequence(
            'service:clean',
            ['images:minify-svg', 'images:raster-svg'],
            [
                'css:make-sprite-for-svg', 'css:make-fallback-for-svg', 'css:make-sprite'
            ],
            [
                'css:compile-css', 'css:compile-css-for-ie8', 'css:compile-css-for-ie9', 'css:move-separate',
                'html:concat-modules-data',
                'other:move-misc-files', 'other:move-fonts', 'other:move-assets',
                'images:move-content-img', 'images:move-plugins-img', 'images:move-general-img',
                'js:move-separate'
            ],
            [
                'js:processing',
                'html:compile-templates'
            ],
            cb
        );
    });
};
