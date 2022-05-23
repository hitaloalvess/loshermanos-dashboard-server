import { Account } from '@prisma/client';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../../accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { CustomersRepositoryInMemory } from '../../repositories/in-memory/CustomersRepositoryInMemory';
import { CreateCustomerUseCase } from './CreateCustomerUseCase';

let customersRepositoryInMemory: ICustomersRepository;
let accountsRepositoryInMemory: IAccountsRepository;

let createCustomerUseCase: CreateCustomerUseCase;

let account: Account;
describe('Create customer', () => {
    beforeEach(async () => {
        customersRepositoryInMemory = new CustomersRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();

        createCustomerUseCase = new CreateCustomerUseCase(
            customersRepositoryInMemory,
            accountsRepositoryInMemory,
        );

        account = await accountsRepositoryInMemory.create({
            name_stablishment: 'Test',
        });
    });

    it('should be able to create a new customer', async () => {
        const customer = await createCustomerUseCase.execute({
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

        expect(customer).toHaveProperty('id');
    });

    it('should not be able to create a new customer with existing cpf', async () => {
        await createCustomerUseCase.execute({
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

        await expect(
            createCustomerUseCase.execute({
                name: 'Test 1',
                cpf: '1234345435',
                road: 'Rua test1',
                district: 'District test 1',
                number: '300',
                city: 'Test city 1',
                phone: '(17)3333333',
                zip_code: '11111-111',
                id_account: account.id,
            }),
        ).rejects.toEqual(
            new AppError('There is already a customer with our cpf'),
        );
    });

    it('should not be able to create a new customer for non-existent account', async () => {
        await expect(
            createCustomerUseCase.execute({
                name: 'Test 1',
                cpf: '1234345435',
                road: 'Rua test1',
                district: 'District test 1',
                number: '300',
                city: 'Test city 1',
                phone: '(17)3333333',
                zip_code: '11111-111',
                id_account: '1234432',
            }),
        ).rejects.toEqual(new AppError('Account does not exists'));
    });
});
