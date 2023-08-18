// Require dependencies
const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// Load build path
const buildPath = path.resolve(__dirname, 'dist');

// Create client webpack config
const client = {
  entry: './src/index.client.ts',
  target: 'node',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: '.config/tsconfig.client.json',
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ESLintPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ],

  experiments: {
    topLevelAwait: true
  },

  optimization: {
    minimize: false
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  output: {
    path: buildPath,
    filename: 'client.js'
  }
};

// Create server webpack config
const server = {
  entry: './src/index.server.ts',
  target: 'node',

  optimization: {
    minimize: false,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: '.config/tsconfig.server.json',
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ESLintPlugin(),
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    new ForkTsCheckerWebpackPlugin()
  ],

  experiments: {
    topLevelAwait: true
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  output: {
    path: buildPath,
    filename: 'server.js'
  }
};

/**
 * Export client and server webpack configs
 *
 * @type {object[]}
 */
module.exports = [client, server];
