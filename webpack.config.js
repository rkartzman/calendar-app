const path = require('path');

module.exports = {
  entry: './index.js',
  mode: "development",
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                "@babel/plugin-proposal-class-properties",
                {
                  "loose": true
                }
              ],
              "@babel/plugin-proposal-optional-chaining",
              [
                "@babel/plugin-proposal-decorators",
                {
                  "legacy": true
                }
              ],
              "@babel/plugin-proposal-function-bind",
              "@babel/plugin-syntax-export-default-from",
              "@babel/plugin-syntax-dynamic-import",
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: [
      __dirname
    ],
    quiet: false,
    //host: '0.0.0.0', if we want to test mobile, uncomment
    // host:
    hot: true,
    port: 3000,
    // publicPath: outputFolder,
    writeToDisk: true,  // need this for the VSCode<->Chrome debug extension to work
    //filename: outFile,
  }
  
};