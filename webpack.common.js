const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const Dotenv = require("dotenv-webpack")

module.exports = {
  context: __dirname,
  entry: {
    // browserIntro: "./src/intro/index.tsx",
    browserMain: "./src/main/index.tsx",
    browserLanding: "./src/landing/index.ts",
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
      buffer: require.resolve("buffer/"),
      assert: require.resolve("assert/"),
      stream: require.resolve("stream-browserify/"),
      crypto: require.resolve("crypto-browserify/"),
      http: require.resolve("stream-http/"), // stream-http
      https: require.resolve("https-browserify/"), // https-browserify
      url: require.resolve("url/"), // url
      os: require.resolve("os-browserify/browser"), // os-browserify
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      assert: ["assert"],
      stream: ["stream"],
      crypto: ["crypto"],
      https: ["https"],
      http: ["http"],
      url: ["url"],
      os: ["os"],
    }),
    new webpack.EnvironmentPlugin({
      VERCEL_ENV: null,
      VERCEL_GIT_COMMIT_SHA: null,
      SENTRY_DSN: null,
    }),
    new Dotenv({
      path: "./.env", // Path to .env file (this is the default)
      safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "edit.html",
      chunks: ["browserMain"],
      template: path.join(__dirname, "public", "edit.html"),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      chunks: ["browserLanding", "browserMain"],
      template: path.join(__dirname, "public", "app.html"),
    }),
  ],
}
