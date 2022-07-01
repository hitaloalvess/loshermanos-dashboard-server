import { Decimal } from '@prisma/client/runtime';

import { Account, Customer, Product } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../../accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { ICustomersRepository } from '../../../customers/repositories/ICustomersRepository';
import { CustomersRepositoryInMemory } from '../../../customers/repositories/in-memory/CustomersRepositoryInMemory';
import { ProductsRepositoryInMemory } from '../../../products/repositories/in-memory/ProductsRepositoryInMemory';
import { IProductsRepository } from '../../../products/repositories/IProductsRepository';
import { SaleProductsRepositoryInMemory } from '../../repositories/in-memory/SaleProductsRepositoryInMemory';
import { SalesRepositoryInMemory } from '../../repositories/in-memory/SalesRepositoryInMemory';
import { IProductsSaleRepository } from '../../repositories/ISaleProductsRepository';
import { ISalesRepository } from '../../repositories/ISalesRepository';
import { CreateSaleUseCase } from './CreateSaleUseCase';

let salesRepositoryInMemory: ISalesRepository;
let accountsRepositoryInMemory: IAccountsRepository;
let customersRepositoryInMemory: ICustomersRepository;
let saleProductsRepositoryInMemory: IProductsSaleRepository;
let productsRepositoryInMemory: IProductsRepository;

let createSaleUseCase: CreateSaleUseCase;

let account: Account;
let customer: Customer;
let product: Product;
describe('Create a new sale', () => {
    beforeEach(async () => {
        salesRepositoryInMemory = new SalesRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        customersRepositoryInMemory = new CustomersRepositoryInMemory();
        saleProductsRepositoryInMemory = new SaleProductsRepositoryInMemory();
        productsRepositoryInMemory = new ProductsRepositoryInMemory();

        createSaleUseCase = new CreateSaleUseCase(
            salesRepositoryInMemory,
            accountsRepositoryInMemory,
            customersRepositoryInMemory,
            saleProductsRepositoryInMemory,
        );

        account = await accountsRepositoryInMemory.create({
            name_stablishment: 'Test',
        });

        customer = await customersRepositoryInMemory.create({
            name: 'Test',
            cpf: '1234345435',
            road: 'Rua test',
            district: 'District test',
            number: '330',
            city: 'Test city',
            phone: '(17)2222222',
            zip_code: '11111-111',
            id_account: account.id as string,
        });

        product = await productsRepositoryInMemory.create({
            description: 'Teste',
            price: new Decimal(44),
            image_name: 'logo.png',
            id_account: account.id as string,
        });
    });

    it('should be able to create a new sale', async () => {
        const sale = await createSaleUseCase.execute({
            total: new Decimal(50),
            value_pay: new Decimal(50),
            descount: new Decimal(0),
            sale_type: 'PAID_OUT',
            updated_at: new Date(),
            id_account: account.id as string,
            id_customer: customer.id as string,
            products: [product],
        });

        expect(sale).toHaveProperty('id');
    });

    it('should not be able to create a new sale for non-existent account', async () => {
        await expect(
            createSaleUseCase.execute({
                total: new Decimal(50),
                value_pay: new Decimal(50),
                descount: new Decimal(0),
                sale_type: 'PAID_OUT',
                updated_at: new Date(),
                id_account: 'asfrwer123',
                id_customer: customer.id as string,
                products: [product],
            }),
        ).rejects.toEqual(new AppError('Account does not exists'));
    });

    it('should not be able to create a new sale for non-existent customer', async () => {
        await expect(
            createSaleUseCase.execute({
                total: new Decimal(50),
                value_pay: new Decimal(50),
                descount: new Decimal(0),
                sale_type: 'PAID_OUT',
                updated_at: new Date(),
                id_account: account.id as string,
                id_customer: 'asdewr123213asdasd',
                products: [product],
            }),
        ).rejects.toEqual(new AppError('Customer does not exists'));
    });

    it('should not be able to create a new sale without products', async () => {
        await expect(
            createSaleUseCase.execute({
                total: new Decimal(50),
                value_pay: new Decimal(50),
                descount: new Decimal(0),
                sale_type: 'PAID_OUT',
                updated_at: new Date(),
                id_account: account.id as string,
                id_customer: customer.id as string,
                products: [],
            }),
        ).rejects.toEqual(new AppError('Cannot create a sale without product'));
    });
});
