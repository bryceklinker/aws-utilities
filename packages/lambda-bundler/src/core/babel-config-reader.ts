import path from 'path';
import {FileIO} from '../io/file-io';

const DEFAULT_BABEL_CONFIG = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ]
    ]
}

export async function readBabelConfig(configPath?: string): Promise<Object> {
    if (configPath) {
        return await readBabelConfigFromPath(configPath);
    }
    return DEFAULT_BABEL_CONFIG;
}

async function readBabelConfigFromPath(configPath: string): Promise<Object> {
    if (path.extname(configPath) === '.js') {
        return require(configPath);
    }

    return JSON.parse(await FileIO.readFile(configPath));
}
