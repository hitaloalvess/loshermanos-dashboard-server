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
import { DeleteSaleUseCase } from './DeleteSaleUseCase';

let salesRepositoryInMemory: ISalesRepository;
let accountsRepositoryInMemory: IAccountsRepository;
let customersRepositoryInMemory: ICustomersRepository;
let productsRepositoryInMemory: IProductsRepository;
let saleProductsRepositoryInMemory: IProductsSaleRepository;

let deleteSaleUseCase: DeleteSaleUseCase;

let account: Account;
let sale: Sale;
let product: Product;
describe('Delete sale', () => {
    beforeEach(async () => {
        salesRepositoryInMemory = new SalesRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        customersRepositoryInMemory = new CustomersRepositoryInMemory();
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        saleProductsRepositoryInMemory = new SaleProductsRepositoryInMemory();

        deleteSaleUseCase = new DeleteSaleUseCase(
            salesRepositoryInMemory,
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

        product = await productsRepositoryInMemory.create({
            description: 'Teste',
            price: new Decimal(44),
            image_name: 'logo.png',
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

    it('should be able to delete a sale', async () => {
        const deletedSale = await deleteSaleUseCase.execute(sale.id as string);
        const sales = await salesRepositoryInMemory.findAll(
            account.id as string,
        );

        expect(deletedSale).toHaveProperty('id');
        expect(sales).not.toContainEqual(deletedSale);
    });

    it('should not be able to delete a non-existent sale', async () => {
        await expect(deleteSaleUseCase.execute('sd17da8sd12')).rejects.toEqual(
            new AppError('Sale does not exists'),
        );
    });
});
