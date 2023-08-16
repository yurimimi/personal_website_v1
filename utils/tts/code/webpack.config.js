const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
  mode: 'development',
  entry: "./src/gtts-client.ts",
  devtool: 'inline-source-map',
  module: {
    rules: [
      // {
      //   test: /\.ts$/,
      //   exclude: /node_modules/,
      //   use: [
      //     { loader: 'ts-loader', },
      //     { loader: '@thyseus/transformer-webpack' }
      //   ]
      // },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(gltf|glb)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(bin)$/i,
        loader: 'file-loader',
        options: {
          // name: '[name].[contenthash].[ext]',
          name: '[name].[ext]',
          // outputPath: 'assets1',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          // name: '[name].[contenthash].[ext]',
          name: '[name].[ext]',
          outputPath: 'textures',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      }
    ]
  },
  output: {
    filename: "out.js",
    path: path.resolve(__dirname, 'dist')
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.resolve(__dirname, 'public/index.html')

  //   })]
}