import webpack, {Configuration} from 'webpack';
import path from 'path';
import {logger} from './logger';
import {APP_NODE_MODULES} from '../app-paths';

const PnpWebpackPlugin = require('pnp-webpack-plugin');

export interface MakeWebpackConfigOptions {
    name: string;
    filePath: string;
    output: string;
    babelConfig?: any;
}

export function makeWebpackConfig({name, filePath, output, babelConfig}: MakeWebpackConfigOptions): Configuration {
    return {
        entry: {
            [name]: filePath
        },
        output: {
            path: output,
            filename: name,
            library: '[name]',
            libraryTarget: 'umd'
        },
        externals: [
          'aws-sdk'
        ],
        resolve: {
            modules: [
                'node_modules',
                APP_NODE_MODULES
            ],
            plugins: [
                PnpWebpackPlugin
            ],
        },
        resolveLoader: {
            plugins: [
                PnpWebpackPlugin.moduleLoader(module)
            ]
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: [
                        {
                            loader: require.resolve('babel-loader'),
                            options: babelConfig || {}
                        }
                    ]
                }
            ]
        }
    };
}

export interface ExecuteWebpackOptions {
    filePath: string;
    output: string;
    babelConfig?: Object;
}

export function executeWebpack({filePath, output, babelConfig}: ExecuteWebpackOptions): Promise<string> {
    return new Promise((resolve, reject) => {
        const name = path.basename(filePath);
        const config = makeWebpackConfig({name, filePath, output, babelConfig});
        webpack(config, (err, stats) => {
            if (err) {
                reject(err);
            } else if (stats.hasErrors()) {
                reject(stats.toJson().errors);
            } else {
                logger.info(stats.toString({warnings: false}));
                resolve(path.resolve(output, name));
            }
        });
    });
}
