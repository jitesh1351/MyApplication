var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var APP_DIR = path.resolve(__dirname, './app');
var DEV_BUILD = path.resolve(__dirname, './public');
function buid_path() {
    return DEV_BUILD;
};

function getPlugIn() {
        return [
            new webpack.ProvidePlugin({
                Promise: 'bluebird'
            }),
            new HtmlWebpackPlugin({
                template: path.resolve("./index.html"),
                filename: 'index.html'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                filename: "vendor.js",
                minChunks: function (module) {
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            })
        ]
}

var config = {
    entry: APP_DIR + '/main.js',
    output: {
        path: buid_path(),
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        port: 4444
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: ['es2015', 'react', "stage-2"]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?sourceMap']
            },
            {
                test: /\.(svg|jpg|png|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            }
        ]
    },
    plugins: getPlugIn(),
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            "app_assets": __dirname + "/app/assets",
            "rootSource": __dirname + "/app",
            "container_source": __dirname + "/app/containers",
            "app_components": __dirname + "/app/components",
            "app_actions": __dirname + "/app/actions",
            "app_reducers": __dirname + "/app/reducers"
        },
    },
    devtool: "#inline-source-map"
};

module.exports = config;