import { Decimal } from '@prisma/client/runtime';

import { Account } from '../../../../database/entities';
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
            price: new Decimal(35),
            image_name: 'logo.png',
            id_account: account.id as string,
        });

        expect(product).toHaveProperty('id');
    });

    it('should not be able to create a new product for a non-existent account', async () => {
        expect(
            createProductUseCase.execute({
                description: 'Pizza de frango',
                price: new Decimal(35),
                image_name: 'logo.png',
                id_account: '2412124',
            }),
        ).rejects.toEqual(new AppError('Account does not exists'));
    });

    it('should not be able to create a new product with existing description', async () => {
        await createProductUseCase.execute({
            description: 'Pizza de frango',
            price: new Decimal(35),
            image_name: 'logo.png',
            id_account: account.id as string,
        });

        await expect(
            createProductUseCase.execute({
                description: 'Pizza de frango',
                price: new Decimal(39),
                image_name: 'logo.png',
                id_account: account.id as string,
            }),
        ).rejects.toEqual(
            new AppError('There is already a product with this description'),
        );
    });
});
