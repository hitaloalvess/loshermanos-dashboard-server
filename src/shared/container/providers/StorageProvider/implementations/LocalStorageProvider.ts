import fs from 'fs';
import { resolve } from 'path';

import uploadConfig from '../../../../../config/upload';

class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(uploadConfig.tmpFolder, file),
            resolve(`${uploadConfig.tmpFolder}/${folder}`, file),
        );

        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        const fileName = resolve(`${uploadConfig.tmpFolder}/${folder}`, file);
        try {
            await fs.promises.stat(fileName); // verifica se o arquivo existe
        } catch {
            return;
        }

        await fs.promises.unlink(fileName); // remove o arquivo
    }
}

export { LocalStorageProvider };
