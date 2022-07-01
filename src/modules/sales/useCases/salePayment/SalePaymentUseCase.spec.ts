import { Decimal } from '@prisma/client/runtime';
import { v4 as uuid } from 'uuid';

import { Account, Product, Sale } from '../../../../database/entities';
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
import { SalePaymentUseCase } from './SalePaymentUseCase';

let accountsRepositoryInMemory: IAccountsRepository;
let productsRepositoryInMemory: IProductsRepository;
let salesRepositoryInMemory: ISalesRepository;
let saleProductsRepositoryInMemory: IProductsSaleRepository;
let customersRepositoryInMemory: ICustomersRepository;

let salePaymentUseCase: SalePaymentUseCase;

let account: Account;
let product: Product;
let product1: Product;
let sale: Sale;
describe('Sale payment', () => {
    beforeEach(async () => {
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        salesRepositoryInMemory = new SalesRepositoryInMemory();
        saleProductsRepositoryInMemory = new SaleProductsRepositoryInMemory();
        customersRepositoryInMemory = new CustomersRepositoryInMemory();

        salePaymentUseCase = new SalePaymentUseCase(salesRepositoryInMemory);

        account = await accountsRepositoryInMemory.create({
            name_stablishment: 'Test',
        });

        product = await productsRepositoryInMemory.create({
            description: 'Teste',
            price: new Decimal(44),
            image_name: 'logo.png',
            id_account: account.id as string,
        });

        product1 = await productsRepositoryInMemory.create({
            description: 'Teste1',
            price: new Decimal(22),
            image_name: 'logo.png',
            id_account: account.id as string,
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

        sale = await salesRepositoryInMemory.create({
            total: new Decimal(50),
            value_pay: new Decimal(40),
            descount: new Decimal(0),
            sale_type: 'PENDING',
            updated_at: new Date(),
            id_account: account.id as string,
            id_customer: customer.id as string,
        });
    });

    it('should be able to pay a sale', async () => {
        const value_pay = new Decimal(10);
        const current_amount_paid = new Decimal(
            Number(sale.value_pay) + Number(value_pay),
        );

        const updatedSale = await salePaymentUseCase.execute({
            id_sale: sale.id as string,
            value_pay,
        });

        expect(updatedSale).toHaveProperty('id');
        expect(updatedSale.value_pay).toEqual(current_amount_paid);
    });

    it('should not be able to pay for a non-existent sale', async () => {
        const value_pay = new Decimal(10);

        await expect(
            salePaymentUseCase.execute({
                id_sale: 'incorrectID',
                value_pay,
            }),
        ).rejects.toEqual(new AppError('Sale does not exists'));
    });

    it('should not be able to update the value of sale_type when value_pay is less than total', async () => {
        const updatedSale = await salePaymentUseCase.execute({
            id_sale: sale.id as string,
            value_pay: new Decimal(5),
        });

        expect(updatedSale.sale_type).toEqual('PENDING');
        expect(updatedSale.sale_type).not.toEqual('PAID_OUT');
    });
});
