module.exports = {
    app_files: {
        options: {
            style: 'compressed',
            sourcemap:'file',
        },
        files: {
            'tekt/static/assets/styles.min.css': 'tekt/static/styles/styles.scss'
        }
    },
    vendor_files: {
        options: {
            style: 'compressed',
            sourcemap:'file',
        },
        files: {
            'tekt/static/assets/vendor.min.css': 'tekt/static/vendor/styles/vendor.scss'
        }
    }
}

