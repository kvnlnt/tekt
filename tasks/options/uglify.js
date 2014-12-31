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
            'tekt/static/vendor/scripts/jquery-2.1.3.min.js',
            'tekt/static/vendor/scripts/jquery.cookie.js',
            'tekt/static/vendor/scripts/bootstrap.min.js',
        ],
        dest: 'tekt/static/assets/vendor.min.js'
    },
}