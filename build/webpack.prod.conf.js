const path = require('path');
const webpack = require('webpack');
const DIST_PATH = path.resolve(__dirname, '../dist');
// 注意这里的路径
const DIST_PATH2 = path.resolve(__dirname, '../../jiulang-blog-node/build');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//打包之前清除文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//分析打包后的包体积大小等
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//分离css
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const { resolve } = require('path');
const WebpackBar = require('webpackbar');
//引入基础webpack设置。
module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    //会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
    devtool: 'modul-cheap-source-map', //不带列映射(column-map)的 SourceMap，将加载的 Source Map 简化为每行单独映射。
    output: {
        // 开启contenthash文件缓存
        filename: 'js/[name].[contenthash:10].js',
        path: DIST_PATH2
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
                        if (
                            module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )
                        ) {
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )[1];
                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${packageName.replace('@', '')}`;
                        } else {
                            // src的代码不分离
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
                            {
                                loader: 'css-loader',
                                options: {
                                    localIdentName:
                                        '[name]-[local]-[hash:base64:3]',
                                    modules: true
                                }
                            },
                            // 使用loader的默认配置
                            // 'postcss-loader',
                            // 修改loader的配置
                            {
                                loader: 'postcss-loader',
                                // 下面一行注意 postcss-loader3   postcss-loader4的写法不一样
                                options: {
                                    postcssOptions: {
                                        ident: 'postcss',
                                        plugins: [
                                            // postcss的插件
                                            require('postcss-preset-env')()
                                        ]
                                    }
                                }
                            }
                        ],
                        exclude: /node_modules/,
                        include: /\.module\./
                    },
                    {
                        test: /\.css$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: '../'
                                }
                            },
                            { loader: 'css-loader' },
                            // 使用loader的默认配置
                            // 'postcss-loader',
                            // 修改loader的配置
                            {
                                loader: 'postcss-loader',
                                // 下面一行注意 postcss-loader3   postcss-loader4的写法不一样
                                options: {
                                    postcssOptions: {
                                        ident: 'postcss',
                                        plugins: [
                                            // postcss的插件
                                            require('postcss-preset-env')()
                                        ]
                                    }
                                }
                            }
                        ],
                        exclude: /\.module\./
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
                                    outputPath: 'images/',
                                    pulicPath: resolve(__dirname) + 'build/images'
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
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, '../'), //根目录
            verbose: false, //开启在控制台输出信息
            cleanOnceBeforeBuildPatterns: [
                // 不清除dll文件夹
                '**/*',
                '!dll',
                '!dll/**'
            ]
        }),

        new HtmlWebpackPlugin({
            //将目录下的index.html引进生成的dist中的index.html
            template: 'public/index.html',
            title: '旧浪博客',
            minify: {
                // 删除一些注释空行
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new BundleAnalyzerPlugin({
            //打包分析
            analyzerPort: 10000,
            openAnalyzer: true
        }),
        new MiniCssExtractPlugin({
            //分离css
            filename: 'css/[name].[chunkhash:8].css',
            chunkFilename: 'css/[id].[hash].css'
        }),
        // 告诉webpack 哪些包不需要打包
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, '../dist/dll/vendor.manifest.json')
        }),
        // 把js CSS资源放在html上
        new addAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, '../dist/dll/vendor.dll.js')
        }),
        //显示打包进度
        new WebpackBar()
    ],
    // 控制台打包信息的显示隐藏
    stats: {
        assets: false,
        builtAt: false,
        modules: false,
        entrypoints: false,
        warnings: true,
        errors: true
    }
});

