const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const dotEnv = require('dotenv');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(
        dotEnv.config({
          path: '.env.local',
        }).parsed
      ),
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  },
});
