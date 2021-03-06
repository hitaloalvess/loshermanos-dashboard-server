import { Decimal } from '@prisma/client/runtime';

import { EnvironmentType } from '../../../../@types';
import { AppError } from '../../../../shared/errors/AppError';
import { getUrlProduct } from '../../../../util/handleUrl';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../../accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { ProductsRepositoryInMemory } from '../../repositories/in-memory/ProductsRepositoryInMemory';
import { IProductsRepository } from '../../repositories/IProductsRepository';
import { ListAllProductsUseCase } from './ListAllProductsUseCase';

let productsRepositoryInMemory: IProductsRepository;
let accountsRepositoryInMemory: IAccountsRepository;

let listAllProductsUseCase: ListAllProductsUseCase;

describe('List all producsts', () => {
    beforeEach(() => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();

        listAllProductsUseCase = new ListAllProductsUseCase(
            productsRepositoryInMemory,
            accountsRepositoryInMemory,
        );
    });

    it('should be able to list all products', async () => {
        const account = await accountsRepositoryInMemory.create({
            name_stablishment: 'Teste',
        });

        const product = await productsRepositoryInMemory.create({
            description: 'Pizza teste',
            price: new Decimal(45),
            image_name: 'logo.png',
            id_account: account.id as string,
        });

        const products = await listAllProductsUseCase.execute(
            account.id as string,
        );

        const newListProducts = products.map(product => {
            return {
                ...product,
                url: getUrlProduct(
                    process.env.DISK as EnvironmentType,
                    product.image_name,
                ),
            };
        });

        expect(products).toEqual([newListProducts[0]]);
    });

    it('should not be able to list products from non-existent accounts', async () => {
        await expect(listAllProductsUseCase.execute('123241')).rejects.toEqual(
            new AppError('Account does not exists'),
        );
    });
});
