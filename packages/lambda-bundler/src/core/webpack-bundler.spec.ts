import {makeWebpackConfig} from './webpack-bundler';

describe('webpack-bundler', () => {

    test('when config is made then options are used', () => {
        const config = makeWebpackConfig({filePath: 'hello.js', name: 'hello', output: 'build'});

        expect(config.entry).toEqual(expect.objectContaining({
            hello: 'hello.js'
        }));
        expect(config.output?.path).toEqual('build');
    });

    test('when config is made with babel config then babel config is used', () => {
        const config = makeWebpackConfig({filePath: 'bob', name: 'jack', output: 'idk', babelConfig: {presets: []}});

        expect(config.module?.rules).toContainEqual(expect.objectContaining({
            use: [
                {
                    loader: require.resolve('babel-loader'),
                    options: {
                        presets: []
                    }
                }
            ]
        }))
    });

    test('when config created then aws-sdk is an external', () => {
        const config = makeWebpackConfig({filePath: '', name: '', output: ''});

        expect(config.externals).toContainEqual('aws-sdk');
    })
});
