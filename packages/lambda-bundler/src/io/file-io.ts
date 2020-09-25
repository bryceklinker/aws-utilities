import fs from 'fs';
import rimraf from 'rimraf';

function remove(filePath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        rimraf(filePath, error => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        })
    });
}

function exists(filePath: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        fs.stat(filePath, (err, stat) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}

function readFile(filePath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

export const FileIO = {remove, exists, readFile};
