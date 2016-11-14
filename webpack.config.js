var webpack = require('webpack')
var PROD = (process.env.NODE_ENV === 'production')

module.exports = {
    entry: './assets/js/main.js',
    output: {
        filename: './assets/js/build.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ] : []
}
