const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './examples/entry.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // ?表示有0或者1个x
        exclude: /node_modules/,  // 不编译该目录下的文件
        include: path.resolve(__dirname, '../examples'),  // 只在include包含的目录下进行loader编译
        use: [
          "babel-loader",
        ]
      },
      // 处理css
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../examples/index.tpl'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, '../examples/favicon.ico')
    }),
  ]
}