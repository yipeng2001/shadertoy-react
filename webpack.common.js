const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "examples/src/index.html"),
    filename: "./index.html"
});

module.exports = {
  entry: path.join(__dirname, "examples/src/index.jsx"),
  output: {
    path: path.join(__dirname, "examples/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.glsl$/i,
          use: 'webpack-glsl-loader'
        // type: 'asset/source',  // This will handle GLSL files as raw text
      },
      {
        test: /\.(png|jpg|gif|mp4|avi|m4v)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: [".js", ".jsx", '.glsl']
  },
  devServer: {
    host: '0.0.0.0',
    port: 3001
  }
};