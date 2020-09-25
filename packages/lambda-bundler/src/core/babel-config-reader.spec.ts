import path from 'path';
import {readBabelConfig} from './babel-config-reader';
import {FileIO} from '../io/file-io';

describe('babel-config-reader', () => {
    test('when path is not defined then returns default babel config', async () => {
        const config = await readBabelConfig();

        expect(config).toEqual({
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
        });
    });

    test('when javascript babel config path provided then returns config from javascript file', async () => {
        const jsConfigPath = path.resolve(__dirname, '..', '..', 'testing', 'sample-babel-config.js');
        const config = await readBabelConfig(jsConfigPath);

        expect(config).toEqual(require(jsConfigPath));
    });

    test('when json babel config path provided then returns config from json file', async () => {
        const jsonConfigPath = path.resolve(__dirname, '..', '..', 'testing', 'sample-babel-config.json');
        const config = await readBabelConfig(jsonConfigPath);

        expect(config).toEqual(JSON.parse(await FileIO.readFile(jsonConfigPath)));
    })
});
