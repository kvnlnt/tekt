module.exports = {
    options: {
        compress: {
            dead_code: true
        },
        preserveComments: false,
        mangle: true,
        sourceMap:true,
    },
    app_files: {
        src: [
            'tekt/static/scripts/scripts.js',
            'tekt/static/scripts/patterns/**/*.js',
            'tekt/static/scripts/pieces/**/*.js', 
            'tekt/static/scripts/parts/**/*.js', 
            'tekt/static/scripts/pages/**/*.js',
        ],
        dest: 'tekt/static/assets/scripts.min.js',
    },
    vendor_files: {
        src: 'tekt/static/vendor/**/*.js',
        dest: 'tekt/static/assets/vendor.min.js'
    },
}