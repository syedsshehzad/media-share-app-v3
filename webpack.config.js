// Import path for resolving file paths
var path = require('path');

module.exports = {
  // Specify the entry point for our app.
  entry: [
    path.join(__dirname, '/classes/main.jsx')
  ],
  // Specify the output file containing our bundled code
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'shehzadsite-bundle.js'
  },
  optimization: {
    minimize: false
  },
  module: {
    /**
      * Tell webpack how to load 'json' files. 
      * When webpack encounters a 'require()' statement
      * where a 'json' file is being imported, it will use
      * the json-loader.  
      */
    rules: [
      {
        test: /\.jsx$/, 
        loaders: ['babel-loader']
      }
    ]
  }
}