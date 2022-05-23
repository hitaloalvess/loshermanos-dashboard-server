import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { v4 as uuid } from 'uuid';

import { AppError } from '../../../../shared/errors/AppError';
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
            id_account: account.id,
        });

        const products = await listAllProductsUseCase.execute(account.id);

        expect(products).toEqual([product]);
    });

    it('should not be able to list products from non-existent accounts', async () => {
        await expect(listAllProductsUseCase.execute('123241')).rejects.toEqual(
            new AppError('Account does not exists'),
        );
    });
});
