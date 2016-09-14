const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const appHost = process.env.APP_HOST || 'localhost';
const appPort = process.env.APP_PORT || 3000;

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    `webpack-dev-server/client?http://${appHost}:${appPort}`,
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'demo.js'),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        plugins: ['react-hot-loader/babel'],
      },
    }, {
      test: /\.(scss|css)$/,
      loaders: [
        'style',
        'css',
        'postcss',
        'sass',
      ],
    }, {
      test: /\.md$/,
      exclude: /node_modules/,
      loader: 'raw',
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: appPort,
    host: appHost,
  },
  postcss: function() {
    return [
      autoprefixer({ browsers: ['last 2 versions'] }),
    ];
  },
};
