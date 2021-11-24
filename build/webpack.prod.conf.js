const path = require('path');
const DIST_PATH = path.resolve(__dirname, '../dist');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//打包之前清除文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//分析打包后的包体积大小等
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//分离css
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入基础webpack设置。
module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    //会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
    devtool: 'modul-cheap-source-map', //不带列映射(column-map)的 SourceMap，将加载的 Source Map 简化为每行单独映射。
    output: {
        // 开启contenthash文件缓存
        filename: 'js/[name].[contenthash:10].js',
        path: DIST_PATH
    },
    // 打包分离
    optimization: {
        // 开启contenthash文件缓存
        namedChunks: true,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        if (module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${packageName.replace('@', '')}`;
                        } else {
                            // src的代码不分离
                            // const moduleContext = module.context;
                            return 'src';
                        }

                    }
                }
            }
        }
    },
    module: {
        rules: [
            {
                //下面的loader只会匹配一个，处理性能更好
                //注意：不能有两个配置处理同一种类型文件
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            { loader: 'css-loader' },
                            { loader: 'postcss-loader' }
                        ]
                    },
                    {
                        test: /\.(sc|sa)ss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            { loader: 'css-loader' },
                            { loader: 'sass-loader' },
                            { loader: 'postcss-loader' }
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            { loader: 'css-loader' },
                            { loader: 'less-loader' },
                            { loader: 'postcss-loader' }
                        ]
                    },
                    {
                        test: /\.(png|svg|jpg|gif|jpe?g)$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    limit: 10000,
                                    name: '[hash].[ext]',
                                    outputPath: 'images/'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    //与开发模式下基本相同,MiniCssExtraPlugin插件分离css文件
    plugins: [
        new CleanWebpackPlugin({}), //每次打包前清除dist
        new HtmlWebpackPlugin({
            //将目录下的index.html引进生成的dist中的index.html
            template: 'public/index.html',
            title: '基于vue的webpack4教手架项目 准备在项目中采用vue-router、vuex、vant等技术(product生产环境)',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }

        }),
        // new BundleAnalyzerPlugin({//打包分析
        //     analyzerPort: 10000,
        //     openAnalyzer: true
        // }),
        new MiniCssExtractPlugin({//分离css
            filename: 'css/[name].[chunkhash:8].css',
            chunkFilename: 'css/[id].[hash].css'
        })
    ]
});

