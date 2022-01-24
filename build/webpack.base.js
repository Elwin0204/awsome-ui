const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('./config');

module.exports = {
  entry: {
    main: './examples/entry.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
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
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      // 加载解析文件资源
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader', // 和file-loader功能相同，但更智能
          options: {
            // 配置打包后的文件名,具体可看webpack的file-loader文档
            name: '[name].[ext]?[hash]',
            outputPath: 'images/',
            limit: 4096 // 当图片大小大于4k时将以文件形式输出，否则以base64输出
          }
        }
      },
      // 引入字体，svg等文件
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../examples/index.tpl'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, '../examples/favicon.ico')
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    })
  ],
  optimization: {
    usedExports: true,
  }
}