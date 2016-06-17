//
//
//              Created by
//            __ _____ __    _____ _____    _____ _____    __ _____
//         __|  |  |  |  |  |   __|   | |  | __  |     |__|  |     |
//        |  |  |  |  |  |__|   __| | | |  |    -|  |  |  |  |  |  |
//        |_____|_____|_____|_____|_|___|  |__|__|_____|_____|_____|
//
//                on 02/05/2016
//                   isusk246@gmail.com
//
//


const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VersionFile = require('webpack-version-file-plugin');
const precss       = require('precss');
const autoprefixer = require('autoprefixer');

const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  develop: path.join(__dirname, 'build-develop')
};
// default title will be overridden in App.jsx
const APP_TITLE = 'MyACC - Welcome';

process.env.BABEL_ENV = TARGET;

const common = {
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif)$/,
        loaders: ['url-loader?limit=70000&name=assets/images/[name].[ext]'],
        include: PATHS.app
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=30000&name=assets/fonts/[name].[ext]'
      },
      { test: /\.html$/, loader: 'raw', include: PATHS.app }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: PATHS.app
      }
    ]
  }
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: '#eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      watchOptions: {
        poll: 1000
      },
      // display only errors to reduce the amount of output
      stats: 'errors-only',
      // parse host and port from env so this is easy
      // to customize
      host: process.env.HOST,
      port: process.env.PORT
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, loaders: ['react-hot', 'babel?cacheDirectory'], include: PATHS.app },
        { test: /\.scss$/, loader: 'style!css!postcss-loader!sass' }
      ]
    },
    postcss: function () {
      return [precss, autoprefixer({ browsers: ['last 4 versions'] })];
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlwebpackPlugin({
        template: './templates/index.webpack.ejs',
        title: APP_TITLE,
        unsupportedBrowser: true
      }),
      new webpack.DefinePlugin({
        '__LOCAL_DEV__': JSON.stringify(JSON.parse('true')),
        '__DEBUG__': JSON.stringify(JSON.parse('true'))
      })
    ]
  });
}

if(TARGET === 'build' || TARGET === 'release') {
  module.exports = merge(common, {
    // Define entry points needed for splitting
    entry: {
      app: PATHS.app,
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, loaders: ['babel'], include: PATHS.app },
        { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss-loader!sass') }
      ]
    },
    postcss: function () {
      return [precss, autoprefixer({ browsers: ['last 4 versions'] })];
    },
    plugins: [
      new Clean([PATHS.build], {
        verbose: true,
        dry: false
      }),
      // Output extracted CSS to a file
      new ExtractTextPlugin('styles.[chunkhash].css'),
      // Extract vendor and manifest files
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      // Setting DefinePlugin affects React library size!
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        },
        '__LOCAL_DEV__': JSON.stringify(JSON.parse('false')),
        '__DEBUG__': JSON.stringify(JSON.parse('false'))
      }),
      new HtmlwebpackPlugin({
        template: './templates/index.production.ejs',
        unsupportedBrowser: true,
        title: APP_TITLE,
        baseHref: '/'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new VersionFile({
          packageFile:path.join(__dirname, 'package.json'),
          template: './templates/version.ejs',
          outputFile: 'version.txt'
      }),
      new CopyWebpackPlugin([
        { from: __dirname + '/version.txt', to: './version', toType: 'file' }
      ])
    ]
  });
}

if(TARGET === 'develop') {
  module.exports = merge(common, {
    entry: {
      app: PATHS.app,
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: PATHS.develop,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    devtool: '#eval-source-map',
    module: {
      loaders: [
        { test: /\.jsx?$/, loaders: ['babel'], include: PATHS.app },
        { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss-loader!sass') }
      ]
    },
    postcss: function () {
      return [precss, autoprefixer({ browsers: ['last 4 versions'] })];
    },
    plugins: [
      new Clean([PATHS.develop], {
        verbose: true,
        dry: false
      }),
      // Output extracted CSS to a file
      new ExtractTextPlugin('styles.[chunkhash].css'),
      // Extract vendor and manifest files
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      // Setting DefinePlugin affects React library size!
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        },
        '__LOCAL_DEV__': JSON.stringify(JSON.parse('false')),
        '__DEBUG__': JSON.stringify(JSON.parse('true'))
      }),
      new HtmlwebpackPlugin({
        title: APP_TITLE,
        template: './templates/index.develop.ejs',
        unsupportedBrowser: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}

if(TARGET === 'test' || TARGET === 'tdd') {
  module.exports = merge(common, {
    entry: {}, // karma will set this
    output: {}, // karma will set this
    devtool: 'inline-source-map',
    resolve: {
      alias: {
        'src': PATHS.app
      }
    },
    module: {
      preLoaders: [
        {
          test: /\.js?$/,
          loaders: ['isparta-instrumenter'],
          include: PATHS.app
        }
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          query: {
            presets: ['airbnb'],
          },
          exclude: /(node_modules)/,
        },
        { test: /\.json$/, loader: 'json' },
        { test: /\.scss$/, loader: 'style!css!sass'}
      ]
    },
    // This section is for Enzyme.js
    externals: {
    // 'jsdom': "window",
    'cheerio': "window",
    'react/addons': true,
    // 'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    },
    plugins: [
      new webpack.DefinePlugin({
        // Note: this is false for tests so that a) we are testing the real behaviour, and b) there are no artificial delays in AJAX requests.
        '__LOCAL_DEV__': JSON.stringify(JSON.parse('false')),
        '__DEBUG__': JSON.stringify(JSON.parse('true'))
      })
    ]
  });
}
