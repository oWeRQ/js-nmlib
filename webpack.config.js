var webpack = require('webpack');

module.exports = {
	entry: './src/demo',
	output: {
		path: __dirname + '/build',
		publicPath: 'build/',
		filename: 'demo.js'
	},
	resolve: {
		modulesDirectories: [
			'node_modules',
			'src'
		],
		alias: {
			jquery: 'bower_components/jquery/dist/jquery.min'
		}
	},
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	],
	devtool: 'source-map'
};