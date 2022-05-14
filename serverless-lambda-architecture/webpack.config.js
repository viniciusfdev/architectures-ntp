const path = require('path');
const slsw = require('serverless-webpack');
const webpack = require('webpack');

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  // mode: "production",
  entry: slsw.lib.entries,

  /// disable only in production to decrease bundle size
  devtool: slsw.lib.webpack.isLocal ? 'source-map' : undefined,
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
  output: {
    libraryTarget: 'commonjs',
    filename: '[name].js',
    path: path.join(__dirname, '.webpack'),
  },
  target: 'node',
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules|\.test\./,

        /// avoid type checking
        options: { transpileOnly: true },
      },
    ],
  },
  plugins: [],
};
