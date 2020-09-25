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

export const FileIO = {remove, exists};
