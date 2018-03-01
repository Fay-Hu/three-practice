var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var CompressionWebpackPlugin = require('compression-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(
      ['dist'], {
        root: path.resolve(__dirname,'../'),
        verbose: true,
        dry: true
      }
    ),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      sourceMap: false
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),

    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        ['js', 'css'].join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
})

module.exports = webpackConfig
