import { v4 as uuid } from 'uuid';

import { Customer } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../../accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { CustomersRepositoryInMemory } from '../../repositories/in-memory/CustomersRepositoryInMemory';
import { UpdateCustomerUseCase } from './UpdateCustomerUseCase';

let customersRepositoryInMemory: ICustomersRepository;
let accountsRepositoryInMemory: IAccountsRepository;

let updateCustomerUseCase: UpdateCustomerUseCase;

let customer: Customer;
describe('Update customer', () => {
    beforeEach(async () => {
        customersRepositoryInMemory = new CustomersRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();

        updateCustomerUseCase = new UpdateCustomerUseCase(
            customersRepositoryInMemory,
        );

        const account = await accountsRepositoryInMemory.create({
            name_stablishment: 'Teste',
        });

        customer = await customersRepositoryInMemory.create({
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
    });

    it('should be able to update customer', async () => {
        const newCustomer = await updateCustomerUseCase.execute({
            name: 'Name test 1',
            cpf: '11111',
            road: 'Road test 1',
            district: 'District test 1',
            number: '1111',
            city: 'City test 1',
            phone: '12345',
            zip_code: '111111',
            id_customer: customer.id as string,
        });

        expect(newCustomer).toHaveProperty('id');
        expect(newCustomer.cpf).toBe('11111');
    });

    it('should not be able to update a non-existent customer', async () => {
        await expect(
            updateCustomerUseCase.execute({
                name: 'Name test 2',
                cpf: '2222',
                road: 'Road test 2',
                district: 'District test 2',
                number: '122121',
                city: 'City test 2',
                phone: '12345222',
                zip_code: '22222',
                id_customer: 'asdwesdasd',
            }),
        ).rejects.toEqual(new AppError('Customer does not exists'));
    });
});
