import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import ExtractTextPlugin from "extract-text-webpack-plugin";
export default {
  debug: true,
  devtool: "source-map",
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, "src/vendor"),
    main: path.resolve(__dirname, "src/index")
  },
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[chunkhash].js" //placeholder for the output files
  },
  plugins: [
    //The plugin extracts css bundled with javascript
    //Generates an external css file with a hash in the filename
    new ExtractTextPlugin("[name].[contenthash].css"),

    //Hash the files using MD5 so that their names change when the content changes
    new WebpackMd5Hash(),

    //Use CommonsChunkPlugin to create a separate bundle
    //of vendor libraries so that they're cached separately.
    //The plugin ensures that all vendor libraries are only
    // referenced in the vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),

    //create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: "src/index.html",
      minify: {
        //custom options to minify html
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,

      //properties you define here are available in index.html
      //using htmlWebpackPlugin.options.varName
      trackJSToken: "4b9daf8398d640979b6024f4f3041a9e"
    }),

    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    //Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ["babel"] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("css?sourceMap") }
    ]
  }
};
