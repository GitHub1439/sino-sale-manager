const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HappyPack = require('happypack')
const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')
const Timestamp = new Date().getTime();
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    productionSourceMap: false, // 生成环境sourcemap
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        draw: {
            entry: 'src/draw/main.js',
            template: 'public/draw.html',
            // 在 dist/index.html 的输出
            filename: 'draw.html',
            title: '设置处方签名',
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'draw']
        }
    },
    devServer: {
        // port: 8106

            // development server port 8000
            port: 8080,
            proxy: {
              '/api': {
               // target: 'https://fxdev.sinocare.com/api',
                target: 'http://192.168.150.137/',
                pathRewrite: {
                  '^/api': ''
                },
                ws: false,
                changeOrigin: true
              }
            }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer({
                        overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
                    })
                ]
            },
            scss: {
                data: '@import "~@/assets/scss/_variables.scss";'
            }
        }
    },
    runtimeCompiler: true,
    configureWebpack: config => {


        config.plugins.push(
            new webpack.ProvidePlugin({
                $api: [path.resolve(__dirname, './src/config/api'), 'default']
            })
        )
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0] = new TerserPlugin({
                sourceMap: false,
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
                    threshold: 10240,
                    minRatio: 0.8
                })
            )
            config.performance = {
                hints: 'warning',
                // 入口起点的最大体积 整数类型（以字节为单位）
                maxEntrypointSize: 5000000,
                // 生成文件的最大体积 整数类型（以字节为单位 300k）
                maxAssetSize: 3000000,
                // 只给出 js 文件的性能提示
                assetFilter(assetFilename) {
                    return assetFilename.endsWith('.js')
                }
            }
            if (process.env.npm_config_pack) {
                config.plugins.push(
                    new HappyPack({
                        // 用id来标识 happypack处理那里类文件
                        id: 'happyBabel',
                        // 如何处理  用法和loader 的配置一样
                        loaders: [
                            {
                                loader: 'babel-loader?cacheDirectory=true'
                            }
                        ],
                        // 共享进程池
                        threadPool: HappyPack.ThreadPool({size: require('os').cpus().length}),
                        // 允许 HappyPack 输出日志
                        verbose: true
                    })
                )
            }
        }
    },
    chainWebpack: config => {
        config.module.rules.delete('svg')
        config.module
            .rule('svg-smart')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: '[name]'
            })
        config.plugin('ignore')
            .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(zh-cn)$/))
    }
}
