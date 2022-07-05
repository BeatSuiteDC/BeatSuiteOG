const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: false,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules\/(?!(ethereum-cryptography|@0x)\/)/,

        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public/*.sf2", to: "[name][ext]" },
        { from: "public/*.svg", to: "[name][ext]" },
        { from: "public/*.png", to: "[name][ext]" },
        { from: "public/*.js", to: "[name][ext]" },
        { from: "public/*.webmanifest", to: "[name][ext]" },
        { from: "public/*.css", to: "[name][ext]" },
      ],
    }),
  ],
})
