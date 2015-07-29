var webpack = require('webpack');

module.exports = {
	entry: {
		'demo': './src/demo',
		'jquery.nmlib': './src/jquery.nmlib'
	},
	output: {
		path: __dirname + '/build',
		publicPath: 'build/',
		filename: '[name].js'
	},
	externals: {
		jquery: 'jQuery'
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