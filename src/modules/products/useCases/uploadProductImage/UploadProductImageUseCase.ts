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
        let fileName: string;

        if (!folder) {
            fileName = resolve(`${upload.tmpFolder}`, filename);
        } else {
            fileName = resolve(`${upload.tmpFolder}/${folder}`, filename);
        }

        try {
            await fs.promises.stat(fileName);
        } catch (error) {
            throw new AppError('File does not exists');
        }

        let image_name: string;

        try {
            image_name = await this.storageProvider.save(
                filename,
                folder as string,
            );
        } catch {
            throw new AppError('Could not save file to storage');
        }

        return image_name;
    }
}

export { UploadProductImageUseCase };
