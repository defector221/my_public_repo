const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const TreserJSPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MD5Hash = require('webpack-md5-hash');
const {DuplicatesPlugin} = require('inspectpack/plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = {
    node:{
        __dirname:true
    },
    context: __dirname,
    entry: {
        index:'./app/assets/javascripts/index.js'
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery:'jquery',
            backbone:'backbone',
            _:'underscore',
            anime:"anime"
        })
    ],
    externals: {
        jquery: 'jQuery',
        jQuery: 'jQuery',
        underscore: "_",
        anime:"anime"
    },
    output:{
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'app/assets/webpack')
    },
    optimization:{
        splitChunks:{
            chunks:'all',
            cacheGroups:{
                vendor:{
                    test:/[\\/]node_modules[\\/]/,
                    name:'vendor',
                    minSize:0,
                    reuseExistingChunk:true
                },
                books:{
                    test:/[\\/]books[\\/]/,
                    name:'books_js',
                    minSize:0,
                    chunks:'initial',
                    reuseExistingChunk:true
                }
            }
        }
    },
    resolve:{
        extensions:['.dust','.js', '.json', '.scss'],
        modules:[
            'app/assets/javascripts',
            'app/assets/stylesheets',
            'node_modules'
        ],
        descriptionFiles:['package.json'],
        alias:{
            app: '.',
            'dustjs-linkedin':'dustjs-linkedin/dist/dust-core',
            dust:'dustjs-linkedin',
            'dust-helpers':'dustjs-helpers'
        }
    },
    resolveLoader:{
        modules: ['node_modules', path.resolve(__dirname, 'loaders')],
        alias:{
            text: 'urls-json-loader',
            'resolve-i18n': 'amdi18n-loader',
            es6:'custom-es6-loader',
            'popper.js':'@popperjs/dist/cjs/popper',
            underscore:'underscore/underscore-min',
            backbone:'backbone/backbone-min'
        }
    },
    module:{
        rules:[
            {
                test:/app(\\|\/)assets(\\|\/)javascripts(\\|\/)*.(js)$/,
                exclude:/(node_modules)/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test:/\.dust$/,
                use:[{
                    loader:'custom-dust-loader',
                    options:{
                        rootDir: 'app/assets/javascripts'
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader",
                options: { name: 'public/static/[name].[ext]' }
            },
            {
                test:/dustjs-linkedin/,
                use:['imports-loader?define=>false']
            },
            {
                test:/dustjs-helpers/,
                use:['imports-loader?define=>false']
            }
        ]
    }
}

module.exports = (env, argv) => {
    var ASSET_PATH = argv.mode === 'development' ? '/dev-assets/' : env.ASSET_PATH
    if(argv.mode === 'development'){
        config.output.publicPath = ASSET_PATH;
        config.devtool = 'none';
    }

    if(argv.mode === 'production'){
        if(env.folderName && env.folderName !== ""){
            ASSET_PATH += env.folderName
        }

        config.output.publicPath = ASSET_PATH
        config.output.filename = '[name]-bundle-openwings-'+Math.random().toString(36).substr(2)+'-[contenthash].js';
        config.output.chunkFilename = '[id]-bundle-openwings-'+Math.random().toString(36).substr(2)+'-[contenthash].js';
        config.output.path = path.resolve(__dirname, env.folderName ? 'public/static/' + env.folderName : 'public/static');

        config.optimization.runtimeChunk = 'single';
        config.optimization.moduleIds = 'hashed';
        config.optimization.minimize = true;
        config.optimization.minimizer = [new TreserJSPlugin({
            parallel: true,
            exclude: /\/(node_modules)/,
            terserOptions: {
                ie8: true,
                safari10: true,
                output: {
                    ecma: 5,
                    quote_style: 2,
                    quote_keys: true
                }
            }
        })];
        config.plugins.push(new ManifestPlugin({
            fileName:'webpack-common-manifest.json',
            publicPath: env.folderName ? "/static/" + env.folderName : "/static/"
        }));
        config.plugins.push(new CompressionPlugin({
            test:/\.js(\?.*)?$/i,
            algorithm:'gzip',
            minRatio:1
        }));
        config.plugins.push(new MD5Hash());
        config.plugins.push(new webpack.DefinePlugin({
            'process.env.ASSEST_PATH': JSON.stringify(ASSET_PATH)
        }));
    }
    config.plugins.push(new DuplicatesPlugin({
        emitErrors:false,
        verbose:true
    }));
    config.plugins.push(new DuplicatePackageCheckerPlugin({
        strict:true,
        verbose:true,
        showHelp:true,
        emitError:false
    }));
    config.plugins.push(new MiniCssExtractPlugin({
        filename: '[name].[contenthash].optimized.css',
        chunkFilename: '[id].[contenthash].optimized.css',
    }))
    return config;
} 
