const path = require('path'); // Node.js модуль для разрешения путей файлов
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader, 'css-loader',
      ],
    },
    {
      test: /\.(png|jpg|gif)$/i,
      dependency: { not: ['url'] },
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      ],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './main.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: './dist/main.css',
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
};
