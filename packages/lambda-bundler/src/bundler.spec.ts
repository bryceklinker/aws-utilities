import path from 'path';
import extract from 'extract-zip';

import {FileIO} from './io/file-io';
import {bundle} from './bundler';

const SAMPLE_LAMBDA_PATH = path.resolve(__dirname, '..', 'testing', 'sample-lambda.js');
const BUILD_PATH = path.resolve(__dirname, '..', 'build');
const SAMPLE_ZIP_PATH = path.resolve(BUILD_PATH, 'sample-lambda.js.zip');
const SAMPLE_UNZIP_PATH = path.resolve(BUILD_PATH, 'extracted');
const SAMPLE_UNZIPPED_LAMBDA_PATH = path.resolve(BUILD_PATH, 'extracted', 'sample-lambda.js');
const CUSTOM_BABEL_CONFIG_PATH = path.resolve(__dirname, '..', 'testing', 'actual-babel-config.js');

describe('bundler', () => {
    beforeEach(async () => {
        if (await FileIO.exists(BUILD_PATH)) {
            await FileIO.remove(BUILD_PATH);
        }
    });

    test('when bundled with file path and zip path then file is added to archive', async () => {
        await bundle({
            filePath: SAMPLE_LAMBDA_PATH,
            zipPath: SAMPLE_ZIP_PATH
        });

        await extract(SAMPLE_ZIP_PATH, {dir: SAMPLE_UNZIP_PATH});
        expect(await FileIO.exists(SAMPLE_UNZIPPED_LAMBDA_PATH)).toEqual(true);
    });

    test('when babel config path provided then bundled correctly', async () => {
        await bundle({
            filePath: SAMPLE_LAMBDA_PATH,
            zipPath: SAMPLE_ZIP_PATH,
            babelConfigPath: CUSTOM_BABEL_CONFIG_PATH
        });

        expect(await FileIO.exists(SAMPLE_ZIP_PATH)).toEqual(true);
    })
});
