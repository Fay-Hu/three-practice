var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: "eslint-loader"
      }
    ]
  },
  watch: true,
  devServer: {
    contentBase: "../dist",
    historyApiFallback: true,
    inline: true,
    hot: true,
    open: true,
    useLocalIp: false,
    host: "127.0.0.1"
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js']
    }),
    new FriendlyErrorsPlugin()
  ]
})

module.exports = webpackConfig
