import { Decimal } from '@prisma/client/runtime';

import { Product } from '../../../../database/entities';
import { LocalStorageProvider } from '../../../../shared/container/providers/StorageProvider/implementations/LocalStorageProvider';
import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../../accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { ProductsRepositoryInMemory } from '../../repositories/in-memory/ProductsRepositoryInMemory';
import { IProductsRepository } from '../../repositories/IProductsRepository';
import { DeleteProductUseCase } from './DeleteProductUseCase';

let productsRepositoryInMemory: IProductsRepository;
let accountsRepositoryInMemory: IAccountsRepository;
let storageProvider: IStorageProvider;

let deleteProductUseCase: DeleteProductUseCase;

let product: Product;
describe('Delete product', () => {
    beforeEach(async () => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        storageProvider = new LocalStorageProvider();

        deleteProductUseCase = new DeleteProductUseCase(
            storageProvider,
            productsRepositoryInMemory,
        );

        const account = await accountsRepositoryInMemory.create({
            name_stablishment: 'Teste',
        });

        product = await productsRepositoryInMemory.create({
            description: 'Teste',
            price: new Decimal(44),
            image_name: 'logo.png',
            id_account: account.id as string,
        });
    });

    it('should be able to delete product', async () => {
        const deleteProduct = await deleteProductUseCase.execute(
            product.id as string,
        );

        expect(deleteProduct).toHaveProperty('id');
    });

    it('should not be able to delete a non-existent product', async () => {
        await expect(deleteProductUseCase.execute('idTeste')).rejects.toEqual(
            new AppError('Product does not exists'),
        );
    });
});
