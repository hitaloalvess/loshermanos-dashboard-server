import { Account } from '../../../../database/entities';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateAccountUseCase } from '../createAccount/CreateAccountUseCase';
import { CreateAccountWithAdminUserUseCase } from './CreateAccountWithAdminUserUseCase';

let createAccountWithAdminUserUseCase: CreateAccountWithAdminUserUseCase;
let createAccountUseCase: CreateAccountUseCase;

let accountsRepositoryInMemory: IAccountsRepository;
let usersRepositoryInMemory: IUsersRepository;

let account: Account;

describe('Create account with admin user', () => {
    beforeEach(async () => {
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createAccountWithAdminUserUseCase =
            new CreateAccountWithAdminUserUseCase(
                accountsRepositoryInMemory,
                usersRepositoryInMemory,
            );

        createAccountUseCase = new CreateAccountUseCase(
            accountsRepositoryInMemory,
        );

        account = await createAccountUseCase.execute({
            name_stablishment: 'Teste',
        });
    });

    it('should be able to create a new account with admin user', async () => {
        const accountWithAdminUser =
            await createAccountWithAdminUserUseCase.execute({
                name: 'Teste name',
                email: 'Teste email',
                username: 'Teste username',
                password: 'Teste password',
                telefone: 'Teste telefone',
                name_stablishment: 'Teste name stablishment',
            });

        expect(accountWithAdminUser).toHaveProperty('id');
        expect(accountWithAdminUser.account).toHaveProperty('id');
    });
});
