import { Account, Customer } from '@prisma/client';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../../accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { CustomersRepositoryInMemory } from '../../repositories/in-memory/CustomersRepositoryInMemory';
import { ListAllCustomersUseCase } from './ListAllCustomersUseCase';

let customersRepositoryInMemory: ICustomersRepository;
let accountsRepositoryInMemory: IAccountsRepository;

let listAllCustomersUseCase: ListAllCustomersUseCase;

let customer: Customer;
let account: Account;
describe('List all users', () => {
    beforeEach(async () => {
        customersRepositoryInMemory = new CustomersRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();

        listAllCustomersUseCase = new ListAllCustomersUseCase(
            customersRepositoryInMemory,
            accountsRepositoryInMemory,
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
            id_account: account.id,
        });
    });

    it('should be able to list all users', async () => {
        const customers = await listAllCustomersUseCase.execute(account.id);

        expect(customers).toContainEqual(customer);
    });

    it('should not be ablet to list users from a non-existent account', async () => {
        await expect(listAllCustomersUseCase.execute('asad13')).rejects.toEqual(
            new AppError('Account does not exists'),
        );
    });
});
