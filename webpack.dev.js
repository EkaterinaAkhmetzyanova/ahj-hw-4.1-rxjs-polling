/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
});