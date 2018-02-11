const path = require('path')

const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    app: [resolve('../src/entry.js')]
  },
  output: {
    path: resolve('../dist'),
    filename: "[name].js"
  },
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      '@': resolve('../src')
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: "babel-loader"
      },
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("css/style.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            resolve('node_modules')
          ) === 0
        )
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{
      from: resolve('../static'),
      to: resolve('dist/static'),
      ignore: ['.*']
    }]),
    new CleanWebpackPlugin(
      ['dist/*.hot-update.js', 'dist/*.hot-update.json', ], {
        root: __dirname,
        verbose: true,
        dry: false
      }
    )
  ]
}