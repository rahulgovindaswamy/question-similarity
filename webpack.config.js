const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const dotEnv = require('dotenv');
const webpack = require('webpack');

const getEnv = (envVar) => {
  return `.env.${envVar}`;
};

module.exports = (webpackEnv) => {
  return merge(common, {
    mode: 'production',
    output: {
      publicPath: webpackEnv?.subDir ? `/${webpackEnv.subDir}/` : '/',
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        async: false,
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: ['node_modules'],
        failOnWarning: false,
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(
          dotEnv.config({
            path: webpackEnv?.envVar ? getEnv(webpackEnv.envVar) : '.env',
          }).parsed
        ),
      }),
    ],
    devtool: 'source-map',
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({})],
    },
  });
};
