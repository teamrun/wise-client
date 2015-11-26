var path = require('path');
var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: {
    app: './lib/main.jsx',
    style: './lib/style.js'
  },
  output: {
    path: __dirname + '/lib/dist/',
    filename: '[name]_bundle.js',
    publicPath:  '/lib/dist/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ProgressBarPlugin({
        format: '  build [:bar] :percent',
        clear: false,
        width: 50,
        complete: '✓',
        incomplete: ' ',
        renderThrottle: 30
    })
  ],
  module: {
    loaders: [
      { test: /(\.jsx|\.js)$/, exclude: /node_modules/,
        loaders: ['react-hot', 'babel?stage=0']
      },
      {
        test: /\.less$/,
        loaders: ['style','css', 'less']
      }
    ]
  }

}
