import { Decimal } from '@prisma/client/runtime';
import { v4 as uuid } from 'uuid';

import { Product, Sale } from '../../../../database/entities';
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
import { CreateProductSaleUseCase } from './CreateProductSaleUseCase';

let salesRepositoryInMemory: ISalesRepository;
let productsRepositoryInMemory: IProductsRepository;
let accountsRepositoryInMemory: IAccountsRepository;
let customersRepositoryInMemory: ICustomersRepository;
let saleProductsRepositoryInMemory: IProductsSaleRepository;

let createProductSaleUseCase: CreateProductSaleUseCase;

let sale: Sale;
let product: Product;
describe('Create relationship between sale and product', () => {
    beforeEach(async () => {
        salesRepositoryInMemory = new SalesRepositoryInMemory();
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        customersRepositoryInMemory = new CustomersRepositoryInMemory();
        saleProductsRepositoryInMemory = new SaleProductsRepositoryInMemory();

        createProductSaleUseCase = new CreateProductSaleUseCase(
            saleProductsRepositoryInMemory,
            productsRepositoryInMemory,
            salesRepositoryInMemory,
        );

        const account = await accountsRepositoryInMemory.create({
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

        sale = await salesRepositoryInMemory.create({
            total: new Decimal(50),
            value_pay: new Decimal(50),
            descount: new Decimal(0),
            sale_type: 'PAID_OUT',
            updated_at: new Date(),
            id_account: account.id as string,
            id_customer: customer.id as string,
        });

        product = await productsRepositoryInMemory.create({
            description: 'Teste',
            price: new Decimal(44),
            image_name: 'logo.png',
            id_account: account.id as string,
        });
    });

    it('should be able to create a relationship between sale and product', async () => {
        const saleProduct = await createProductSaleUseCase.execute({
            id_sale: sale.id as string,
            id_product: product.id as string,
            amount: 1,
            product_value: new Decimal(product.price),
        });

        expect(saleProduct).toHaveProperty('id_sale');
        expect(saleProduct).toHaveProperty('id_product');
    });

    it('should not be able to create a relationship between a sale and a non-existent product', async () => {
        await expect(
            createProductSaleUseCase.execute({
                id_sale: sale.id as string,
                id_product: '123123asdqwe',
                amount: 1,
                product_value: new Decimal(product.price),
            }),
        ).rejects.toEqual(new AppError('Product does not exists'));
    });

    it('should not be able to create a relationship between a product and a non-existent sale', async () => {
        await expect(
            createProductSaleUseCase.execute({
                id_sale: 'sadiuwwdw123asd',
                id_product: product.id as string,
                amount: 1,
                product_value: new Decimal(product.price),
            }),
        ).rejects.toEqual(new AppError('Sale does not exists'));
    });
});
