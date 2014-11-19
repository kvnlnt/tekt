module.exports = {
    app_styles: {
        files: ['tekt/static/styles/**/*.scss'],
        tasks: ['sass:app_files'],
        options: {
            livereload: true,
        },
    },
    vendor_styles: {
        files: ['tekt/static/vendor/styles/**/*.scss'],
        tasks: ['sass:vendor_files'],
        options: {
            livereload: true,
        },
    },
    app_scripts: {
        files: ['tekt/static/scripts/**/*.js'],
        tasks: ['uglify:app_files']
    },
    vendor_scripts: {
        files: ['tekt/static/vendor/scripts/**/*.js'],
        tasks: ['uglify:vendor_files']
    },
    test_scripts: {
        files: ['tests/specs/**/*.js'],
        tasks: ['jasmine']
    }
}