const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

const dev = merge(base, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: '192.168.36.247',
        disableHostCheck: true,
        contentBase: [path.resolve(__dirname, "dist"), path.resolve(__dirname, "assets")],
        port: 8085,
        overlay: {
            warnings: false,
            errors: true
        },
    },
    output: {
        publicPath: '/'
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
})

module.exports = new Promise((res, rej) => {
    res(dev)
})