const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const commonjsConfig = {
  entry: './src/index.js',
  output: {
	filename: 'index.cjs.js',
	path: path.resolve(__dirname, 'dist'),
	library: 'BreadCrumbs',  // Exposes the library as a global variable
	libraryTarget: 'umd',
	globalObject: 'this',  // To ensure compatibility across environments (e.g., Node.js, Browser)
	libraryExport: 'default',
  },
  plugins: [
	new HtmlWebpackPlugin({
	  template: './src/index.html',  // Path to your HTML file
	  filename: 'index.html',  // Output file name
	}),
  ],
  mode: 'production',
};

// ES Module Build Configuration
const esmConfig = {
  entry: './src/index.js',
  output: {
	filename: 'index.esm.js',
	path: path.resolve(__dirname, 'dist'),
	library: {
	  type: 'module',  // ES Module output
	},
  },
  experiments: {
	outputModule: true,  // Enable ES module output
  },
  mode: 'production',
};

module.exports = [commonjsConfig, esmConfig];
