import path from 'path';

export const APP_ROOT_DIR = process.cwd();

const resolveAppPath = (name: string) => path.resolve(APP_ROOT_DIR, name);
export const APP_NODE_MODULES = resolveAppPath('node_modules');
