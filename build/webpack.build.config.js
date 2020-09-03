const merge = require('webpack-merge');
const base = require('./webpack.base.config');

const build = merge(base, {
    mode: 'production',
    output: {
        publicPath: './'
    },
})

module.exports = new Promise((res, rej) => {
    res(build)
})