const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { merge } = require('webpack-merge');

const prodConfig = require('./webpack.prod.config');
const devConfig = require('./webpack.dev.config');

const commonConfig = {
  output: {
    filename: `[name].js`, // production일 때, min 파일로 생성
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    globalObject: 'this', // https://stackoverflow.com/questions/66096260/webpack-why-am-i-getting-referenceerror-self-is-not-defined-in-next-js-when-i
  },
  resolve: {
    modules: ['node_modules', path.resolve('./src')],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      },
      {
        test: /\.[tj]sx?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PHASE': JSON.stringify(process.env.PHASE || 'production'),
    }),
    new StylelintPlugin({
      configFile: 'stylelint.config.js',
      context: 'src',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
    }),
  ],
};

if (process.env.PHASE !== 'development') {
  module.exports = merge(commonConfig, prodConfig);
} else {
  module.exports = merge(commonConfig, devConfig);
}
