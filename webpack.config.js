const path    = require('path')
const webpack = require('webpack')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin  = require('extract-text-webpack-plugin')

const autoprefixer = require('autoprefixer')
const cssnano      = require('cssnano')

let isProd = (process.env.NODE_ENV === 'production')
let cssDev = (isProd ? '' : `?root=${__dirname}&sourceMap`)

module.exports = {
  context: __dirname,
  entry: './assets/src/main.js',
  output: {
    publicPath: 'http://localhost:8080/', // for absolute path in css images for sourceMap
    filename: 'assets/dist/main.bundle.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', `css${cssDev}!postcss`)
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', `css${cssDev}!postcss!stylus`)
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file?name=assets/images/[name].[ext]?[hash]'
      }
    ]
  },
  postcss: function() {
    return [
      autoprefixer(),
      cssnano({
        discardComments: {
          removeAll: true
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin('assets/dist/'),
    new ExtractTextPlugin('assets/dist/styles.min.css', { 
      disable: !isProd
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,
      },
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
