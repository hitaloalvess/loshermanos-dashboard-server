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
            'test',
        );
    });

    it('should be able to upload product image', async () => {
        const uploadImageMock = jest.spyOn(
            uploadProductImageUseCase,
            'execute',
        );

        const url = await uploadProductImageUseCase.execute(imageFile, 'test');

        expect(typeof url).toBe('string');
        expect(uploadImageMock).toHaveReturned();
    });

    it('should not be possible to upload the image for a non-existent product', async () => {
        expect(
            uploadProductImageUseCase.execute('C://test', 'test'),
        ).rejects.toEqual(new AppError('File does not exists'));
    });
});
