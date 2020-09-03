const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')

const paths = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets',
}

module.exports = {
  externals: {
    paths: paths,
  },
  entry: {
    app: `${paths.src}/app.ts`
  },
  output: {
    filename: `${paths.assets}/js/[name].js`,
    path: paths.dist,
  },
  resolve: {
    modules: [path.resolve(__dirname, './../src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      src: path.resolve(__dirname, './../src'),
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: `${path.assets}/img/[name].[ext]`
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false
            }
          }
        ]
      },
      {
        test: /\.scss?$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader?name=./assets/fonts/[name].[ext]'
          },
          {
            loader: 'file-loader?name=./assets/fonts/[name].[ext]'
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackPwaManifest({
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'My awesome Progressive Web App!',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('src/assets/icon/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        },
        {
          src: path.resolve('src/assets/icon/icon.png'),
          size: '1024x1024' // you can also use the specifications pattern
        },
        {
          src: path.resolve('src/assets/icon/icon.png'),
          size: '1024x1024',
          purpose: 'maskable'
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: `${paths.assets}/css/[name].css`
    }),
    new htmlWebpackPlugin({
      hash: false,
      template: `${paths.src}/index.html`,
      filename: `./index.html`
    }),
    new copyWebpackPlugin([
      {
        from: `${paths.src}/assets/fonts`,
        to: `${paths.assets}/fonts`,
      },
      {
        from: `${paths.src}/assets/fonts.css`,
        to: `${paths.assets}/css`,
      },
      {
        from: `${paths.src}/assets/img`,
        to: `${paths.assets}/img`,
      },
      {
        from: `${paths.src}/assets/animation`,
        to: `${paths.assets}/animation`,
      },
      {
        from: `${paths.src}/assets/spritesheets`,
        to: `${paths.assets}/spritesheets`,
      },
      {
        from: `${paths.src}/assets/popups`,
        to: `${paths.assets}/popups`,
      },
      {
        from: `${paths.src}/assets/sounds`,
        to: `${paths.assets}/sounds`,
      },
      {
        from: `${paths.src}/assets/sounds`,
        to: `${paths.assets}/sounds`,
      },
    ]),
  ]
};
