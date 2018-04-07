/*globals module, require, __dirname */
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');
const nodeExternals = require('webpack-node-externals');
const dirApp = path.join(__dirname, 'src');

module.exports = merge(webpackConfig, {
    entry: {
        bundle: path.join(dirApp, 'index-node')
    },
    target: 'node',
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 

    devtool: 'source-map',

    output: {
        path: path.join(__dirname, 'dist/node'),
        filename: 'tileExtruder.js' //'[name].[chunkhash].js'
    },

    plugins: [
        new CleanWebpackPlugin(['dist/node'])
    ]
});