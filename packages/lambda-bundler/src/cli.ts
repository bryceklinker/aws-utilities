#!/usr/bin/env node

import yargs from 'yargs';
import {bundle} from './bundler';
import {logger} from './core/logger';

const options = yargs
    .usage('<filePath> <zipPath> --babel-config <babelConfigPath>')
    .argv;

// @ts-ignore
bundle(options)
    .then(() => logger.info('Finished bundling lambda.'))
    .catch(err => logger.error('Failed to bundle lambda', err));

