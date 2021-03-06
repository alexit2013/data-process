const path = require('path');
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin') //开启多线程进行加快速度

module.exports = {
  mode: "production",
  entry: {
    index: './src/index.js',
  },
  output: {
    publicPath: "/",
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue': 'vue/dist/vue.common',
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin,
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
      inject: true,
      title: '特沃兹电商',
      chunks: ['index'],
    }),
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }), //开启多线程进行打包
  ],
  // optimization:{
  //   splitChunks: {  // 加这个打包会变慢很多
  //     chunks: "all",
  //     minSize: 30000,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     name: true,
  //     cacheGroups: {
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true,
  //       },
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10
  //       }
  //     }
  //   }
  // },
  module: {
    rules: [
      {test: /\.vue$/, loader: 'vue-loader'},
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
      {test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/, loader: 'url-loader?limit=8192'},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, loader: 'file-loader?name=font/[name]-[hash].[ext]'},
      // {test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, loader: 'file-loader?publicPath=/'},
    ]
  }
};
