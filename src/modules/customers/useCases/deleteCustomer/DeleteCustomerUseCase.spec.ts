import { Account, Customer } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../../accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { CustomersRepositoryInMemory } from '../../repositories/in-memory/CustomersRepositoryInMemory';
import { DeleteCustomerUseCase } from './DeleteCustomerUseCase';

let customersRepositoryInMemory: ICustomersRepository;
let accountsRepositoryInMemory: IAccountsRepository;

let deleteCustomerUseCase: DeleteCustomerUseCase;

let customer: Customer;
let account: Account;
describe('Delete customer', () => {
    beforeEach(async () => {
        customersRepositoryInMemory = new CustomersRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();

        deleteCustomerUseCase = new DeleteCustomerUseCase(
            customersRepositoryInMemory,
        );

        account = await accountsRepositoryInMemory.create({
            name_stablishment: 'Teste',
        });
    });

    it('should be able to delete customer', async () => {
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
            id_account: account.id,
        });

        const deletedCustomer = await deleteCustomerUseCase.execute(
            customer.id,
        );
        const customers = await customersRepositoryInMemory.findAll(account.id);

        expect(deletedCustomer).toHaveProperty('id');
        expect(customers).not.toContainEqual(deletedCustomer);
    });

    it('should not be able to delete a non-existent customer', async () => {
        await expect(deleteCustomerUseCase.execute('asde123')).rejects.toEqual(
            new AppError('Customer does not exists'),
        );
    });
});
