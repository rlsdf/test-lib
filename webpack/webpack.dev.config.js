const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
      watch: true,
    },
    port: 9000,
    // hot: true, // hot을 안켜도 핫 리로딩이 되네
    // historyApiFallback: {
    //   rewrites: [{ from: /\/.*/, to: './index.html' }],
    // }, // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
  },
  entry: {
    index:
      process.env.ENTRY === 'writer'
        ? `${path.resolve(__dirname, '/src/example/PostWriter.tsx')}`
        : process.env.ENTRY === 'viewer'
        ? `${path.resolve(__dirname, '/src/example/PostViewer.tsx')}`
        : process.env.ENTRY === 'commentWriter'
        ? `${path.resolve(__dirname, '/src/example/CommentWriter.tsx')}`
        : process.env.ENTRY === 'commentViewer'
        ? `${path.resolve(__dirname, '/src/example/CommentViewer.tsx')}`
        : process.env.ENTRY === 'postEndVS'
        ? `${path.resolve(__dirname, '/src/example/PostEndVS.tsx')}`
        : process.env.ENTRY === 'writerVS'
        ? `${path.resolve(__dirname, '/src/example/PostVSWriter.tsx')}`
        : process.env.ENTRY === 'commentWriterVS'
        ? `${path.resolve(__dirname, '/src/example/CommentVSWriter.tsx')}`
        : ``,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html',
    }),
  ],
};

module.exports = devConfig;
