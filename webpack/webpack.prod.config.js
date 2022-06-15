const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');

const prodConfig = {
  mode: 'production',
  devtool: 'hidden-source-map',
  entry: {
    TextCountComponent: {
      import: './entry/components/TextCount.tsx',
      filename: 'components/[name].js',
    },
  },
  output: {
    libraryTarget: 'commonjs',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'web-timeline-editor',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.js$/,
        exclude: /\/node_modules/,
      }),
    ],
  },
  // externals: ['react', 'react-dom'],
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                localIdentName: '[name]_[local]__[hash:base64:5]',
                auto: true,
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.join(__dirname, 'styles'), path.join(__dirname, 'src')],
              },
            },
          },
        ],
      },
    ],
  },
};

module.exports = prodConfig;
