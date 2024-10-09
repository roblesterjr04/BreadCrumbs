const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',  // Path to your entry file
  output: {
	path: path.resolve(__dirname, 'dist'),
	filename: 'breadcrumbs.js',  // Output file name
	library: 'BreadCrumbs',  // Name of the global variable when used in a browser
	libraryTarget: 'umd',  // This makes the package available as both a module and a standalone script
	globalObject: 'this',  // To ensure compatibility across environments (e.g., Node.js, Browser)
	libraryExport: 'default',
  },
  module: {
	rules: [
	  {
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
		  loader: 'babel-loader',
		  options: {
			presets: ['@babel/preset-env'],  // Compile modern JS down to ES5
		  },
		},
	  },
	],
  },
  plugins: [
	  new HtmlWebpackPlugin({
		template: './src/index.html',  // Path to your HTML file
		filename: 'index.html',  // Output file name
	  }),
	],
  mode: 'development',  // You can use 'development' during development
  //devtool: 'source-map',
};
