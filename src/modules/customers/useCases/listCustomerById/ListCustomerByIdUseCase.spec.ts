import { Customer } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../../accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { CustomersRepositoryInMemory } from '../../repositories/in-memory/CustomersRepositoryInMemory';
import { ListCustomerByIdUseCase } from './ListCustomerByIdUseCase';

let customersRepositoryInMemory: ICustomersRepository;
let accountsRepositoryInMemory: IAccountsRepository;

let listCustomerByIdUseCase: ListCustomerByIdUseCase;

let customerMock: Customer;
describe('List customer by id', () => {
    beforeEach(async () => {
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        customersRepositoryInMemory = new CustomersRepositoryInMemory();

        const account = await accountsRepositoryInMemory.create({
            name_stablishment: 'Test',
        });

        listCustomerByIdUseCase = new ListCustomerByIdUseCase(
            customersRepositoryInMemory,
        );

        customerMock = await customersRepositoryInMemory.create({
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

    it('should be able to list customer by id', async () => {
        const customer = await listCustomerByIdUseCase.execute(
            customerMock.id as string,
        );

        expect(customer).toHaveProperty('id');
    });

    it('should not be able to list non-existent customer', async () => {
        await expect(
            listCustomerByIdUseCase.execute('incorrectID'),
        ).rejects.toEqual(new AppError('Customer does not exists'));
    });
});
