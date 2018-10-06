const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                dead_code: true
            }
        })
    ],
    devServer: {
        publicPath: "/",
        contentBase: "./dist",
        hot: true
    },
};
