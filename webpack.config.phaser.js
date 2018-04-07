/*globals module, require, __dirname */
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');
const nodeExternals = require('webpack-node-externals');
const dirApp = path.join(__dirname, 'src');

module.exports = merge(webpackConfig, {
    entry: {
      bundle: path.join(dirApp, 'index-phaser')
    },
    externals: [
      // Every non-relative module is external
      // abc -> require("abc")
      /^[a-z\-0-9]+$/
    ],
    
    devtool: 'source-map',

    output: {
        path: path.join(__dirname, 'dist/phaser'),
        filename: 'tileExtruder.js' //'[name].[chunkhash].js'
    },

    plugins: [
        new CleanWebpackPlugin(['dist/phaser'])
    ]
});