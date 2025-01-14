const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./haskell-project/cabal.project'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    fallback: {
      os: false,
      fs: false,
      child_process: false,
      path: false,
    }
  },
  module: {
    rules: [
      {
        test: /\.(cabal|project)$/,
        use: [
          {
            loader: 'swc-loader', // The default JS loader
          },
          {
            loader: "@haskell-org/haskell-loader",
            options: {
              "install-ghc": "9.12.1",
              "install-cabal": "3.14.1.1",
              "system-tools": false, // don't use system tools since we're installing local ones
              "executable": "example"
          }
        }]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader"
        }
      }
    ],
  },
  plugins: 
    [ new HtmlWebpackPlugin({
        title: 'Haskell loader example'
    })]
};