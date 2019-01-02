const webpack                 = require('webpack')
const UglifyJsPlugin          = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin    = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = [{
   mode: 'development',
   devtool: 'source-map',
   devServer: {
      quiet: true,
      index: '',
      inline: true,
      port: 3000,
      historyApiFallback: {
        rewrites: [
            { from: /.json-hot-update\.js$/, to: '/json-hot-update.js' },
            { from: /.json-chunk-update\.js$/, to: '/json-chunk-update.js' },
        ]
      },
      contentBase: __dirname+'/public/',
      compress: true,
      hot: true,
      overlay: true,
      publicPath: '/',
      open: true,
      openPage: '',
      proxy: [{
        context: [ '/**' ],
        target: 'http://localhost:4000',
        secure: false
      }]
   },
   optimization: {
     minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warning: false,
            keep_fnames: true
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    resolve: {
      modules: [__dirname+'/node_modules'],
      alias: {
          Functions: __dirname+'/src/react/functions/index.jsx'
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader?compact=false',
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            'css-hot-loader',
            MiniCssExtractPlugin.loader,
            "css-loader?url=false",
            "sass-loader"
          ]
        }
      ]
    },
    stats: {
        modules: false,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
          filename: "css/app.css"
        })
    ],
    name: "app",
    entry: ['babel-polyfill', 'react-hot-loader/patch', __dirname+'/src/css/app.scss', __dirname+'/src/app/app.js'],
    output: {
       path: __dirname+"/public/",
       filename: 'js/app.min.js',
       hotUpdateMainFilename: 'json-hot-update.js',
       hotUpdateChunkFilename: 'json-chunk-update.js'
    },
}];
