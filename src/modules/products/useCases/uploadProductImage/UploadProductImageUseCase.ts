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

        const image_name = await this.storageProvider.save(
            filename,
            'products',
        );

        if (!image_name) {
            throw new AppError('Could not save file to storage');
        }

        return image_name;
    }
}

export { UploadProductImageUseCase };
