import fs from 'fs';
import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';

import { EnvironmentType } from '../../../../@types';
import upload from '../../../../config/upload';
import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { getUrlProduct } from '../../../../util/handleUrl';
import { IUploadProductsResponseDTO } from '../../dtos/IUploadProductImageResponseDTO';

@injectable()
class UploadProductImageUseCase {
    constructor(
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}
    async execute(filename: string): Promise<IUploadProductsResponseDTO> {
        const fileName = resolve(`${upload.tmpFolder}`, filename);

        try {
            await fs.promises.stat(fileName);
        } catch (error) {
            throw new AppError('File does not exists');
        }

        const response: IUploadProductsResponseDTO = {
            image_name: '',
            url_image: '',
        };

        try {
            response.image_name = await this.storageProvider.save(
                filename,
                'products',
            );
            response.url_image = getUrlProduct(
                process.env.DISK as EnvironmentType,
                response.image_name,
            );
        } catch (err) {
            throw new AppError('Could not save file to storage');
        }

        return response;
    }
}

export { UploadProductImageUseCase };
