const path = require('path');

module.exports = {
  entry: {
    StartStreamFn: './src/api/startStream/index.ts',
    StopStreamFn: './src/api/stopStream/index.ts',
    ProducerFn: './src/producer/index.ts',
    ConsumerFn: './src/consumer/index.ts',
    GetTweetsFn: './src/api/getTweets/index.ts',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpackBundle/[name]/index.js',
    // necessary to work with AWS
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      common: path.resolve(__dirname, 'src/common/'),
    },
  },
  target: 'node',
  node: {
    __dirname: true,
  },
  mode: 'production',
};
