const path = require('path');
  module.exports = {
    context: __dirname,
    entry: './frontend/index.jsx',
    output: {
    path: './static',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      AppComponent: "frontend/components/app.jsx",
      AppRouter: "frontend/components/router.jsx",
      ImagesActions: "frontend/actions/images_actions.js",
      ImagesMiddleware: "frontend/middleware/images_middleware.js",
      ImagesReducer: "frontend/reducers/images_reducer.js",
      ImagesUtils: "frontend/util/images_utils.js",
      LandingComponent: "frontend/components/landing/landing.jsx",
      MasterMiddleware: "frontend/middleware/master_middleware.js",
      Gallery: 'frontend/components/showcase/gallery.jsx',
      QTNode: "frontend/components/showcase/QTNode.js",
      Root: "frontend/components/root.jsx",
      RootReducer: "frontend/reducers/root_reducer.js",
      Store: "frontend/store/store.js",
      ShowcaseComponent: "frontend/components/showcase/showcase.jsx",
      ShowcaseContainer: "frontend/components/showcase/showcase_container.js",
      UserActions: "frontend/actions/user_actions.js",
      UserReducer: "frontend/reducers/user_reducer.js"
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
