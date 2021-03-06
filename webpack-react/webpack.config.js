const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (env, argv) {
	const isDev = argv.mode === 'development';
	return {
		//context: path.resolve(__dirname, './src'),
        mode: isDev ? 'development' : 'production',
		entry: {
			app: './src/app.tsx',
		},
		output: {
			filename: './js/[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
			//publicPath: '/'
		},
		module: {
			rules: [
				{
					test: /\.ts(x)?$/,
					exclude: /node_modules/,
					use: [
						'ts-loader'
					]
				},
				{
					test: /\.(png|jpe?g|gif)$/i,
					loader: 'file-loader',
				},
				{
					test: /\.s[ac]ss$/i,
					exclude: /node_modules/,
					use: [
						MiniCssExtractPlugin.loader,
						{loader: 'css-loader', options: {importLoaders: 1, sourceMap: true}},
						'postcss-loader'
					]
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
				chunkFilename: '[id].css',
			}),
			//new CleanWebpackPlugin(),
			new webpack.ProgressPlugin(),
			new HtmlWebpackPlugin({template: './src/index.html'})
		],
		devtool: isDev ? 'source-map' : false,
		devServer: {
			contentBase: '.dist'
		},
		resolve: {
			extensions: [
				'.tsx',
				'.ts',
				'.js'
			],
			alias: {}
		}
	}
};