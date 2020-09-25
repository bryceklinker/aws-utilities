import webpack, {Configuration} from 'webpack';
import path from 'path';
import {logger} from './logger';
import {APP_NODE_MODULES} from './app-paths';

const PnpWebpackPlugin = require('pnp-webpack-plugin');

function makeWebpackConfig(name: string, filePath: string, output: string): Configuration {
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
                            options: {}
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
}

export function executeWebpack({filePath, output}: ExecuteWebpackOptions): Promise<string> {
    return new Promise((resolve, reject) => {
        const name = path.basename(filePath);
        const config = makeWebpackConfig(name, filePath, output);
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
