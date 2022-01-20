const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const base = require('./webpack.base');

module.exports = merge({
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:7].js',  // 入口和内容hash组成的文件名，也可以是hash
    chunkFilename: 'js/[name].[contenthash:7].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [  // loader解析的顺序是从下到上，从右到左的顺序
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   filename: '[name].css',
            //   chunkFilename: '[name].css',
            //   publicPath: '../'   //****最后打包的时候替换引入文件路径
            // },
          },
          // 'style-loader',  使用MiniCssExtractPlugin时就不能使用style-loader了
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2   //该方式可以让@import引入的css文件再次执行一边css打包loader
            }
          },
          'less-loader',
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css',
      chunkFilename: 'css/[name].[contenthash:7].css',
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({   // 压缩js代码
        terserOptions: {
          compress: {
            drop_console: true,  // 打包时剔除所有console.log
            drop_debugger: true,  // 打包时剔除所有debugger
            pure_funcs: ['console.log']
          }
        }
      }), 
      new OptimizeCSSAssetsPlugin({})  // 压缩css代码
    ]
  }
}, base)