import { Account } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../../accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { ProductsRepositoryInMemory } from '../../repositories/in-memory/ProductsRepositoryInMemory';
import { IProductsRepository } from '../../repositories/IProductsRepository';
import { CreateProductUseCase } from './CreateProductUseCase';

let productsRepositoryInMemory: IProductsRepository;
let accountsRepositoryInMemory: IAccountsRepository;

let createProductUseCase: CreateProductUseCase;

let account: Account;
describe('Create new product', () => {
    beforeEach(async () => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();

        createProductUseCase = new CreateProductUseCase(
            accountsRepositoryInMemory,
            productsRepositoryInMemory,
        );

        account = await accountsRepositoryInMemory.create({
            name_stablishment: 'Teste',
        });
    });

    it('should be able to create a new product', async () => {
        const product = await createProductUseCase.execute({
            description: 'Pizza de frango',
            price: 35,
            id_account: account.id,
        });

        expect(product).toHaveProperty('id');
    });

    it('should not be able to create a new product for a non-existent account', async () => {
        expect(
            createProductUseCase.execute({
                description: 'Pizza de frango',
                price: 35,
                id_account: '2412124',
            }),
        ).rejects.toEqual(new AppError('Account does not exists'));
    });
});
