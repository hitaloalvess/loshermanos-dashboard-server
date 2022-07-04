import { resolve } from 'path';

import { LocalStorageProvider } from '../../../../shared/container/providers/StorageProvider/implementations/LocalStorageProvider';
import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { UploadProductImageUseCase } from './UploadProductImageUseCase';

let storageProvider: IStorageProvider;

let uploadProductImageUseCase: UploadProductImageUseCase;

let imageFile: string;
describe('Upload product image', () => {
    beforeEach(() => {
        storageProvider = new LocalStorageProvider();
        uploadProductImageUseCase = new UploadProductImageUseCase(
            storageProvider,
        );

        imageFile = resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            '..',
            'tmp',
            'test.png',
        );
    });

    it('should be able to upload product image', async () => {
        const uploadImageMock = jest.spyOn(
            uploadProductImageUseCase,
            'execute',
        );

        const url = await uploadProductImageUseCase.execute(imageFile);

        expect(url).toHaveProperty('image_name');
        expect(url).toHaveProperty('url_image');
        expect(uploadImageMock).toHaveReturned();
    });

    it('should not be possible to upload the image for a non-existent product', async () => {
        await expect(
            uploadProductImageUseCase.execute('test1'),
        ).rejects.toEqual(new AppError('File does not exists'));
    });

    it('should not be possible to upload the image to a product without saving it to storage', async () => {
        await expect(uploadProductImageUseCase.execute('')).rejects.toEqual(
            new AppError('Could not save file to storage'),
        );
    });
});
