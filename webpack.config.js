const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports  = {
  entry : './src/main.js',

  output: {
    filemane: 'bundle[contenthash].js',
    path: path.resolve(__dirname, build),
    clean: true
  },

  devtool: '',

  plugins: [],

  module: {
    rules: [

    ]
  }
}
