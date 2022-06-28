import { Decimal } from '@prisma/client/runtime';
import { v4 as uuid } from 'uuid';

import { Account, SaleWithProducts } from '../../../../database/entities';
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
import { CreateSaleUseCase } from '../createSale/CreateSaleUseCase';
import { ListAllSalesUseCase } from './ListAllSalesUseCase';

let salesRepositoryInMemory: ISalesRepository;
let accountsRepositoryInMemory: IAccountsRepository;
let customersRepositoryInMemory: ICustomersRepository;
let productsRepositoryInMemory: IProductsRepository;
let saleProductsRepositoryInMemory: IProductsSaleRepository;

let listAllSalesUseCase: ListAllSalesUseCase;
let createSaleUseCase: CreateSaleUseCase;

let account: Account;
let sale: SaleWithProducts;
describe('List all sales', () => {
    beforeEach(async () => {
        salesRepositoryInMemory = new SalesRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        customersRepositoryInMemory = new CustomersRepositoryInMemory();
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        saleProductsRepositoryInMemory = new SaleProductsRepositoryInMemory();

        listAllSalesUseCase = new ListAllSalesUseCase(
            salesRepositoryInMemory,
            accountsRepositoryInMemory,
            saleProductsRepositoryInMemory,
        );

        createSaleUseCase = new CreateSaleUseCase(
            salesRepositoryInMemory,
            accountsRepositoryInMemory,
            customersRepositoryInMemory,
            saleProductsRepositoryInMemory,
        );

        account = await accountsRepositoryInMemory.create({
            name_stablishment: 'Test',
        });

        const customer = await customersRepositoryInMemory.create({
            id: uuid(),
            name: 'Name test 1',
            cpf: '11111',
            road: 'Road test 1',
            district: 'District test 1',
            number: '1111',
            city: 'City test 1',
            phone: '12345',
            created_at: new Date(),
            zip_code: '111111',
            id_account: account.id as string,
        });

        const product = await productsRepositoryInMemory.create({
            description: 'Teste',
            price: new Decimal(44),
            image_name: 'logo.png',
            id_account: account.id as string,
        });

        sale = await createSaleUseCase.execute({
            total: new Decimal(50),
            value_pay: new Decimal(40),
            descount: new Decimal(0),
            sale_type: 'PENDING',
            updated_at: new Date(),
            id_account: account.id as string,
            id_customer: customer.id as string,
            products: [
                {
                    ...product,
                    amount: 1,
                },
            ],
        });
    });

    it('should be able to list all sales', async () => {
        const sales = await listAllSalesUseCase.execute(account.id as string);

        expect(sales.length).toBe(1);
    });

    it('should not be able to list sales from a non-existent account', async () => {
        await expect(listAllSalesUseCase.execute('asad13')).rejects.toEqual(
            new AppError('Sale does not exists'),
        );
    });
});
