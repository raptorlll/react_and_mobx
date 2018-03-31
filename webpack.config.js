var path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

var BUILD_DIR = path.resolve(__dirname, 'out');
var APP_DIR = path.resolve(__dirname, 'public');

var config = {
  entry: [
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    extractSass
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader",
          options: {
            includePaths: [APP_DIR + '/public/sass']
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      ".ts",
      ".tsx"
    ]
  }
};

module.exports = config;