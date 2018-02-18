'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// 入口JS文件
let entries = {
  'vendor': [
    'axios',
    'vue',
    'vue-router',
    'element-ui'
  ],
  'index': path.resolve(__dirname, './src/app.js')
}

// 出口JS文件
let output = {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name]-[hash].js',
  publicPath: '/'
}

let pulgins = []

// HTML打包插件
pulgins.push(new HtmlWebpackPlugin({
  template: './index.html',
  title: '煎饼-学webpack',
  filename: 'index.html',
  inject: 'body',
  chunks: ['index', 'vendor'],
  favicon: './assets/favicon.ico'
}))
// 清理输出插件
pulgins.push(new CleanWebpackPlugin(['dist']))

// 热替换插件
pulgins.push(new webpack.HotModuleReplacementPlugin())

// Loader
let loaders = [{
  test: /\.vue$/,
  loader: 'vue-loader'
}, {
  test: /\.js$/,
  loader: 'babel-loader'
}, {
  test: /\.css$/,
  loader: ['style-loader', 'css-loader']
}, {
  test: /\.html$/,
  loader: 'html-loader'
}, {
  test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
  loader: 'file-loader'
}, {
  test: /\.(png|jpg|gif|svg|ico)$/,
  loader: 'file-loader',
  query: {
    name: '/[path][name]-[hash].[ext]',
    context: './src/'
  }
}]

// 蓝图
let aliasMap = {
  'assets': path.resolve(__dirname, './assets'),
  'mock': path.resolve(__dirname, './mock')
}

// dev下的config
let devconfig = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    port: 10001,
    hot: true,
    historyApiFallback: true,
    clientLogLevel: 'none'
  }
}

// Common配置
let common = {
  'entry': entries,
  'output': output,
  'plugins': pulgins,
  module: {
    'loaders': loaders
  },
  resolve: {
    'alias': aliasMap
  }
}

module.exports = function (env) {
  switch (env) {
    case 'dev':
      return merge(common, devconfig)
    case 'build':
      return merge(common)
  }
}
