import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { resolve } from 'path';

import { LocalStorageProvider } from '../../../../shared/container/providers/StorageProvider/implementations/LocalStorageProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../../accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { ProductsImageRepositoryInMemory } from '../../repositories/in-memory/ProductsImageRepositoryInMemory';
import { ProductsRepositoryInMemory } from '../../repositories/in-memory/ProductsRepositoryInMemory';
import { IProductsImageRepository } from '../../repositories/IProductsImageRepository';
import { IProductsRepository } from '../../repositories/IProductsRepository';
import { UploadProductImageUseCase } from './UploadProductImageUseCase';

let productImageRepositoryInMemory: IProductsImageRepository;
let storageProvider: IStorageProvider;
let productRepositoryInMemory: IProductsRepository;
let accountRepositoryInMemory: IAccountsRepository;

let uploadProductImageUseCase: UploadProductImageUseCase;

let product: Product;
let image: string;
describe('Upload product image', () => {
    beforeEach(async () => {
        productImageRepositoryInMemory = new ProductsImageRepositoryInMemory();
        storageProvider = new LocalStorageProvider();
        productRepositoryInMemory = new ProductsRepositoryInMemory();
        accountRepositoryInMemory = new AccountsRepositoryInMemory();

        uploadProductImageUseCase = new UploadProductImageUseCase(
            productImageRepositoryInMemory,
            storageProvider,
            productRepositoryInMemory,
        );

        const account = await accountRepositoryInMemory.create({
            name_stablishment: 'Teste',
        });

        product = await productRepositoryInMemory.create({
            description: 'Pizza de calabresa',
            price: new Decimal(35),
            id_account: account.id,
        });

        image = resolve(__dirname, '..', '..', '..', '..', '..', 'tmp', 'test');
    });

    it('should be able to upload product image', async () => {
        const mock = jest.spyOn(uploadProductImageUseCase, 'execute');

        await uploadProductImageUseCase.execute({
            id_product: product.id,
            image_name: image,
        });

        expect(mock).toHaveBeenCalledTimes(1);
    });

    it('should not be able to upload product image for product non-existent', async () => {
        expect(
            uploadProductImageUseCase.execute({
                id_product: '2312421',
                image_name: image,
            }),
        ).rejects.toEqual(new AppError('Product does not exists'));
    });

    it('should not be able to upload product image for it already contain image', async () => {
        await uploadProductImageUseCase.execute({
            id_product: product.id,
            image_name: image,
        });
        await expect(
            uploadProductImageUseCase.execute({
                id_product: product.id,
                image_name: image,
            }),
        ).rejects.toEqual(new AppError('Product already contains image'));
    });
});
