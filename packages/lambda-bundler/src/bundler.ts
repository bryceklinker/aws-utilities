import path from 'path';
import {executeWebpack} from './core/webpack-bundler';
import {zip} from './core/zipper';
import {readBabelConfig} from './core/babel-config-reader';

export interface BundleOptions {
    filePath: string;
    zipPath: string;
    babelConfigPath?: string;
}

export async function bundle({filePath, zipPath, babelConfigPath}: BundleOptions) {
    const output = path.dirname(zipPath);
    const babelConfig = await readBabelConfig(babelConfigPath);
    const bundledFile = await executeWebpack({filePath, output, babelConfig});
    await zip({filePath: bundledFile, zipPath});
}
