import fs from 'fs';
import archiver, {ArchiverOptions} from 'archiver';
import path from 'path';

export interface ZipOptions {
    filePath: string;
    zipPath: string;
}

const ARCHIVER_DEFAULTS: ArchiverOptions = {
    zlib: {
        level: 9
    }
};

export function zip({filePath, zipPath}: ZipOptions): Promise<void> {
    const zipFileName = `${path.basename(filePath)}`;
    return new Promise<void>((resolve, reject) => {
        const output = fs.createWriteStream(zipPath);
        output.on('close', () => resolve());
        const archive = archiver('zip', ARCHIVER_DEFAULTS);
        archive.on('error', err => reject(err));
        archive.pipe(output);
        archive.file(filePath, {name: zipFileName});
        archive.finalize().catch(err => reject(err));
    });
}
