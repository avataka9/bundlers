const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (env, argv) {
	const isDev = argv.mode === 'development';
	return {
		entry: {
			app: './src/js/index.js',
		}
		,
		output: {
			filename: './js/[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/'
		}
		,
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						'babel-loader'
					]
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: [
						MiniCssExtractPlugin.loader,
						{loader: 'css-loader', options: {importLoaders: 1, sourceMap: true}},
						'postcss-loader'
					]
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: './img'
							}
						}
					]
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: './fonts'
							}
						}
					]
				},
				{
					test: /\.(csv|tsv)$/,
					use: [
						'csv-loader'
					]
				},
				{
					test: /\.xml$/,
					use: [
						'xml-loader'
					]
				}
			]
		}
		,
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
			}),
			new ImageminPlugin({
				disable: isDev,
				test: /\.(jpe?g|png|gif|svg)$/i,
				optipng: {
					optimizationLevel: 2
				},
				gifsicle: {
					optimizationLevel: 1
				},
				jpegtran: {
					progressive: true
				},
				//svgo: {},
			}),
			new FaviconsWebpackPlugin({
				logo: './src/favicon/favicon.png',
				prefix: 'favicons/',
			}),
			new HtmlWebpackPlugin({
				title: 'title',
			}),
			new CleanWebpackPlugin(),
			//new webpack.HotModuleReplacementPlugin(),
		],
		devtool: isDev ? 'source-map' : false,
		devServer: {
			contentBase: '.dist'
			//hot: true
		}
	}
};




module.exports = {
  entry: ['./src/app.tsx', './src/index.html', './src/style.scss'],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        use: ['file-loader?name=[name].[ext]', 'extract-loader', 'html-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
