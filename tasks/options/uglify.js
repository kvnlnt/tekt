module.exports = {
    options: {
        compress: {
            dead_code: true
        },
        preserveComments: false,
        mangle: false,
        sourceMap:true,
    },
    app_files: {
        src: [
            'tekt/static/scripts/scripts.js',
            'tekt/static/scripts/pubsub.js',
            'tekt/static/scripts/scrolling.js',
            'tekt/static/scripts/errors.js',
            'tekt/static/scripts/fx.js',
            'tekt/static/scripts/**/*.js',
        ],
        dest: 'tekt/static/assets/scripts.min.js',
    },
    vendor_files: {
        src: [
            'tekt/static/vendor/scripts/jquery-2.1.3.min.js',
            'tekt/static/vendor/scripts/jquery.cookie.js',
            'tekt/static/vendor/scripts/lodash.min.js',
        ],
        dest: 'tekt/static/assets/vendor.min.js'
    },
}