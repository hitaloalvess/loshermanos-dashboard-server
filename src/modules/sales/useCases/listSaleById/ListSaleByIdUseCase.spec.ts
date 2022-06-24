import { Sale } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../../accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { ICustomersRepository } from '../../../customers/repositories/ICustomersRepository';
import { CustomersRepositoryInMemory } from '../../../customers/repositories/in-memory/CustomersRepositoryInMemory';
import { SalesRepositoryInMemory } from '../../repositories/in-memory/SalesRepositoryInMemory';
import { ISalesRepository } from '../../repositories/ISalesRepository';
import { ListSaleByIdUseCase } from './ListSaleByIdUseCase';

let salesRepositoryInMemory: ISalesRepository;
let accountsRepositoryInMemory: IAccountsRepository;
let customersRepositoryInMemory: ICustomersRepository;

let listSaleByIdUseCase: ListSaleByIdUseCase;

let saleMock: Sale;
describe('List sale by id', () => {
    beforeEach(async () => {
        salesRepositoryInMemory = new SalesRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        customersRepositoryInMemory = new CustomersRepositoryInMemory();

        listSaleByIdUseCase = new ListSaleByIdUseCase(salesRepositoryInMemory);

        const account = await accountsRepositoryInMemory.create({
            name_stablishment: 'LosHermanos',
        });

        const customer = await customersRepositoryInMemory.create({
            name: 'Hitalo',
            cpf: '419.560.068-50',
            city: 'Pontes Gestal',
            district: 'CDHU',
            number: '360',
            phone: '(17) 99679-0426',
            road: 'José Fernandes de Souza',
            zip_code: '15.560-000',
            id_account: account.id,
        });

        saleMock = await salesRepositoryInMemory.create({
            total: new Decimal(100),
            descount: new Decimal(0),
            sale_type: 'PAID_OUT',
            updated_at: new Date(),
            value_pay: new Decimal(100),
            id_account: account.id,
            id_customer: customer.id,
        });
    });

    it('should be able to list sale by id', async () => {
        const sale = await listSaleByIdUseCase.execute(saleMock.id);

        expect(sale).toHaveProperty('id');
    });

    it('should not be able to list sale non-existent', async () => {
        await expect(
            listSaleByIdUseCase.execute('incorrectID'),
        ).rejects.toEqual(new AppError('Sale does not exists'));
    });
});
