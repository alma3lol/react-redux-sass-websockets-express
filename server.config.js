module.exports = [{
   target: 'node',
   mode: 'development',
   resolve: {
      modules: [__dirname+'/node_modules/'],
      alias: {
          API: __dirname+'/src/server/api.jsx'
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader?compact=false',
          exclude: /node_modules/
        }
      ]
    },
    stats: {
        modules: false,
    },
    name: "server",
    entry: ['babel-polyfill', __dirname+'/src/server/server.js'],
    output: {
       path: __dirname+"/dist/",
       filename: 'server.js',
    },
    node: {
      fs: 'empty',
      net: 'empty'
    }
}];
