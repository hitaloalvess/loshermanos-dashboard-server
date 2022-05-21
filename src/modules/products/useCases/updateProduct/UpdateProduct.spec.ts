import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../../accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { ProductsRepositoryInMemory } from '../../repositories/in-memory/ProductsRepositoryInMemory';
import { IProductsRepository } from '../../repositories/IProductsRepository';
import { UpdateProductUseCase } from './UpdateProductUseCase';

let productsRepositoryInMemory: IProductsRepository;
let accountsRepositoryInMemory: IAccountsRepository;

let updateProductUseCase: UpdateProductUseCase;

let product: Product;
describe('Update product', () => {
    beforeEach(async () => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();

        updateProductUseCase = new UpdateProductUseCase(
            productsRepositoryInMemory,
        );

        const account = await accountsRepositoryInMemory.create({
            name_stablishment: 'Teste',
        });

        product = await productsRepositoryInMemory.create({
            description: 'Pizza teste',
            price: new Decimal(99),
            url_image: 'http://localhost:3333/test/logo.png',
            id_account: account.id,
        });
    });

    it('should be able to update product', async () => {
        const productUpdated = await updateProductUseCase.execute({
            description: 'Nova pizza',
            price: new Decimal(45),
            url_image: 'https://localhost:3333/products/logo.png',
            id_product: product.id,
        });

        expect(productUpdated).toHaveProperty('id');
        expect(productUpdated.description).toBe('Nova pizza');
    });

    it('should not be able to update a non-existent product', async () => {
        await expect(
            updateProductUseCase.execute({
                description: 'Nova pizza',
                price: new Decimal(45),
                url_image: 'https://localhost:3333/products/logo.png',
                id_product: '123124124',
            }),
        ).rejects.toEqual(new AppError('Product does not exists'));
    });
});
