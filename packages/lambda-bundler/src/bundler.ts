import path from 'path';
import {executeWebpack} from './webpack-bundler';
import {zip} from './zipper';

export interface BundleOptions {
    filePath: string;
    zipPath: string;
}

export async function bundle({filePath, zipPath}: BundleOptions) {
    const output = path.dirname(zipPath);
    const bundledFile = await executeWebpack({filePath, output});
    await zip({filePath: bundledFile, zipPath});
}
