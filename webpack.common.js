const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const Dotenv = require("dotenv-webpack")
const framerProcess = "node_modules/framer-motion/dist/es/utils/process.mjs"

module.exports = {
  context: __dirname,
  entry: {
    // browserIntro: "./src/intro/index.tsx",
    browserMain: "./src/main/index.tsx",
    // browserLanding: "./src/landing/index.ts",
  },
  output: {
    filename: "[name]-[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)$/,
        loader: "url-loader",
      },
      {
        test: /\.svg$/,
        loader: "react-svg-loader",
      },
    ],
  },
  resolve: {
    modules: ["src", "node_modules", "src/main", "src/common"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    fallback: {
      assert: require.resolve("assert"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      url: require.resolve("url"),
      os: require.resolve("os-browserify"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: ["process/browser"],
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.EnvironmentPlugin({
      VERCEL_ENV: null,
      VERCEL_GIT_COMMIT_SHA: null,
      SENTRY_DSN: null,
    }),
    new Dotenv({
      path: "./.env",
      safe: false,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "app.html",
      template: path.join(__dirname, "public", "app.html"),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "dojo.html",
      template: path.join(__dirname, "public", "edit.html"),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      template: path.join(__dirname, "public", "app.html"),
    }),
  ],
  ignoreWarnings: [/not found/, /Failed to parse source map/],
}
