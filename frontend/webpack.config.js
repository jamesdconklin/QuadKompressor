const path = require('path');
  module.exports = {
    context: __dirname,
    entry: './index.jsx',
    output: {
    path: '../server/static',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      AppComponent: "components/app.jsx",
      ImagesActions: "actions/images_actions.js",
      ImagesMiddleware: "middleware/images_middleware.js",
      ImagesReducer: "reducers/images_reducer.js",
      ImagesUtils: "util/images_utils.js",
      UserActions: "actions/user_actions.js",
      UserReducer: "reducers/user_reducer.js"
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /.node$/,
        loader: 'node-loader'
      },
      {
        test: [/.css?$/],
        loader: 'style-loader!css-loader'
      }
    ]
  },
  devtool: 'source-maps'
};
