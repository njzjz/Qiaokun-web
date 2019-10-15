const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackCdnPlugin = require("webpack-cdn-plugin");
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin");
const CnameWebpackPlugin = require("cname-webpack-plugin");
const SitemapWebpackPlugin = require("sitemap-webpack-plugin").default;
const RobotstxtPlugin = require("robotstxt-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",

        options: {
          plugins: ["syntax-dynamic-import"],

          presets: [["@babel/preset-env", { modules: false }]]
        },

        test: /\.js$/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },

  output: {
    filename: "[name].[chunkhash].js",
    publicPath: "./"
  },

  mode: "production",

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: { priority: -10, test: /[\\/]node_modules[\\/]/ }
      },

      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: __dirname + "/src/index.html",
      inject: "true",
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: "404.html",
      template: __dirname + "/src/404.html",
      inject: "false",
      minify: { collapseWhitespace: true, collapseBooleanAttributes: true }
    }),
    new WebpackCdnPlugin({
      modules: [
        { name: "jquery", var: "$", path: "dist/jquery.min.js" },
        {
          name: "bootstrap",
          path: "dist/js/bootstrap.min.js",
          style: "dist/css/bootstrap.min.css"
        },
        { name: "jquery.easing", path: "jquery.easing.min.js" },
        {
          name: "magnific-popup",
          path: "dist/jquery.magnific-popup.min.js",
          style: "dist/magnific-popup.css"
        },
        {
          name: "startbootstrap-creative",
          path: "js/creative.min.js",
          style: "css/creative.min.css"
        },
        { name: "translater.js", var: "tran", path: "dist/translater.min.js" },
        {
          name: "font-awesome",
          style: "css/font-awesome.min.css",
          cssOnly: true
        }
      ],
      publicPath: "/node_modules",
      prodUrl: "//cdn.jsdelivr.net/npm/:name@:version/:path"
    }),
    new GoogleFontsPlugin({
      fonts: [
        { family: "Merriweather Sans", variants: ["400", "700"] },
        {
          family: "Merriweather",
          variants: ["400", "300", "300italic", "400italic", "700", "700italic"]
        }
      ],
      local: false
    }),
    new CnameWebpackPlugin({
      domain: "qk.njzjz.win"
    }),
    new SitemapWebpackPlugin("http://www.shqkchem.com", ["/"], {
      lastMod: true,
      changeFreq: "monthly",
      priority: "1.0"
    }),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: "*",
          allow: "/"
        }
      ],
      sitemap: "http://www.shqkchem.com/sitemap.xml",
      host: "http://www.shqkchem.com"
    })
  ]
};
