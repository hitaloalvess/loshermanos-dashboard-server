import fs from 'fs';
import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';

import upload from '../../../../config/upload';
import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class UploadProductImageUseCase {
    constructor(
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}
    async execute(filename: string, folder?: string): Promise<string> {
        const fileName = !folder
            ? resolve(`${upload.tmpFolder}`, filename)
            : resolve(`${upload.tmpFolder}/${folder}`, filename);

        const fileExists = await fs.promises.stat(fileName).catch(err => false);

        if (!fileExists) {
            throw new AppError('File does not exists');
        }

        const file = await this.storageProvider.save(filename, 'products');

        if (!file) {
            throw new AppError('Could not save file to storage');
        }

        const url = `${process.env.APP_URL}/products/${filename}`;

        return url;
    }
}

export { UploadProductImageUseCase };
