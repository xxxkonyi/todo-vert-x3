const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const production = (process.env.NODE_ENV === 'production');
const packageInfo = require('./package.json');

const outputPath = path.resolve(__dirname + '/build/' + packageInfo.version);
const releasePath = path.resolve(__dirname + '/build/release/');

const bundle = ['./src/index'];
const plugins = [
  new HtmlWebpackPlugin({
    title: 'My First React Router App',
    favicon: './src/assets/img/240.png',
    template:'./src/index.html',
    filename: 'index.html',
    hash: true,
    minify: {
      removeComments:true,
      collapseWhitespace:false
    }
  }),
  new CopyWebpackPlugin([{
    from: outputPath,
    to: releasePath,
    toType: 'dir'
  }]),
  new ExtractTextPlugin('css/[name].css'),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js')
];
const jsLoaders = ['babel'];

if (production) {
  plugins.unshift(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
} else {
    bundle.unshift(
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server'
    );
    plugins.unshift(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    );
    jsLoaders.unshift('react-hot');
}

module.exports = {
  entry: {
    bundle: bundle,
    vendor: ['react']
  },
  output: {
    path: outputPath,
    filename: 'js/[name].js',
		publicPath: '/'
  },
  devServer:{
    contentBase: outputPath,
    historyApiFallback: true,
    hot: true,
    inline: true
  },
  plugins: plugins,
  resolve: {
//    alias: {
//      'assets': path.join(__dirname, 'resources/')
//    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.(gif|jpg|png)$/, loader: 'url-loader?limit=8192&name=[path][name].[ext]' },
      { test: /\.js$/, exclude: /node_modules/, loaders: jsLoaders },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')},
      { test: /\.(ttf|eot|svg|woff|woff2)$/, loader: 'file?name=fonts/[name].[ext]' }
    ]
  }
};
