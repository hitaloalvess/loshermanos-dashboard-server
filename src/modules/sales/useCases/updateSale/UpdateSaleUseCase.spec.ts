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
import { UpdateSaleUseCase } from './UpdateSaleUseCase';

let accountsRepositoryInMemory: IAccountsRepository;
let productsRepositoryInMemory: IProductsRepository;
let salesRepositoryInMemory: ISalesRepository;
let saleProductsRepositoryInMemory: IProductsSaleRepository;
let customersRepositoryInMemory: ICustomersRepository;

let updateSaleUseCase: UpdateSaleUseCase;

let account: Account;
let product: Product;
let product1: Product;
let sale: Sale;
describe('Update sale', () => {
    beforeEach(async () => {
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        salesRepositoryInMemory = new SalesRepositoryInMemory();
        saleProductsRepositoryInMemory = new SaleProductsRepositoryInMemory();
        customersRepositoryInMemory = new CustomersRepositoryInMemory();

        updateSaleUseCase = new UpdateSaleUseCase(
            salesRepositoryInMemory,
            saleProductsRepositoryInMemory,
        );

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
            value_pay: new Decimal(50),
            descount: new Decimal(0),
            sale_type: 'PAID_OUT',
            updated_at: new Date(),
            id_account: account.id as string,
            id_customer: customer.id as string,
        });

        await saleProductsRepositoryInMemory.create({
            id_sale: sale.id as string,
            id_product: product.id as string,
            amount: 1,
        });
    });

    it('should be able to update a sale', async () => {
        const updatedSale = await updateSaleUseCase.execute({
            id_sale: sale.id as string,
            total: new Decimal(150),
            value_pay: new Decimal(50),
            descount: new Decimal(0),
            sale_type: 'PENDING',
            updated_at: new Date(),
            products: [product, product1],
        });

        expect(updatedSale).toHaveProperty('id');
    });

    it('should not be able to update a non-existent sale', async () => {
        await expect(
            updateSaleUseCase.execute({
                id_sale: '23124asdasd12',
                total: new Decimal(150),
                value_pay: new Decimal(50),
                descount: new Decimal(0),
                sale_type: 'PENDING',
                updated_at: new Date(),
                products: [product, product1],
            }),
        ).rejects.toEqual(new AppError('Sale does not exists'));
    });

    it('should not be able to update a sale and leave it with no products', async () => {
        await expect(
            updateSaleUseCase.execute({
                id_sale: sale.id as string,
                total: new Decimal(150),
                value_pay: new Decimal(50),
                descount: new Decimal(0),
                sale_type: 'PENDING',
                updated_at: new Date(),
                products: [],
            }),
        ).rejects.toEqual(
            new AppError(
                'It is not possible to update a sale and leave it without products',
            ),
        );
    });
});
