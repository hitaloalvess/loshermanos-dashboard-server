import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { RolesRepositoryInMemory } from '../../repositories/in-memory/RolesRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IRolesRepository } from '../../repositories/IRolesRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateAccountWithAdminUserUseCase } from '../createAccountWithAdminUser/CreateAccountWithAdminUserUseCase';
import { ListUsersLinkedToAccountUseCase } from './ListUsersLinkedToAccountUseCase';

let accountsRepositoryInMemory: IAccountsRepository;
let rolesRepositoryInMemory: IRolesRepository;
let usersRepositoryInMemory: IUsersRepository;

let listUsersLinkedToAccountUseCase: ListUsersLinkedToAccountUseCase;
let createAccountWithAdminUserUseCase: CreateAccountWithAdminUserUseCase;
describe('List users linked to account', () => {
    beforeEach(() => {
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        rolesRepositoryInMemory = new RolesRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();

        createAccountWithAdminUserUseCase =
            new CreateAccountWithAdminUserUseCase(
                accountsRepositoryInMemory,
                rolesRepositoryInMemory,
                usersRepositoryInMemory,
            );

        listUsersLinkedToAccountUseCase = new ListUsersLinkedToAccountUseCase(
            usersRepositoryInMemory,
        );
    });

    it('should be able to list all users linked to account', async () => {
        const role = await rolesRepositoryInMemory.create({
            name: 'Admin',
            description: 'Administrador',
        });

        const account = await accountsRepositoryInMemory.create({
            name_stablishment: 'TesteTeste',
        });

        const user = await usersRepositoryInMemory.create({
            name: 'Teste',
            email: 'teste@teste.com',
            username: 'teste123',
            password: '12345',
            telefone: '21344324',
            id_account: account.id,
            id_role: role.id,
        });

        const users = await listUsersLinkedToAccountUseCase.execute({
            id_account: account.id,
        });

        expect(users).toEqual([user]);
    });
});
