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
            'tekt/static/scripts/patterns/*.js',
            'tekt/static/scripts/**/*.js',
        ],
        dest: 'tekt/static/assets/scripts.min.js',
    },
    vendor_files: {
        src: [
            'tekt/static/vendor/scripts/jquery/*.js',
            'tekt/static/vendor/scripts/underscore/*.js',
            'tekt/static/vendor/scripts/backbone/*.js',
        ],
        dest: 'tekt/static/assets/vendor.min.js'
    },
}