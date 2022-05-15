import { AppError } from '../../../../shared/errors/AppError';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { RolesRepositoryInMemory } from '../../repositories/in-memory/RolesRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateAccountWithAdminUserUseCase } from './CreateAccountWithAdminUserUseCase';

let createAccountWithAdminUserUseCase: CreateAccountWithAdminUserUseCase;

let accountsRepositoryInMemory: AccountsRepositoryInMemory;
let rolesRepositoryInMemory: RolesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create account with admin user', () => {
    beforeEach(async () => {
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        rolesRepositoryInMemory = new RolesRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createAccountWithAdminUserUseCase =
            new CreateAccountWithAdminUserUseCase(
                accountsRepositoryInMemory,
                rolesRepositoryInMemory,
                usersRepositoryInMemory,
            );
    });

    it('should be able to create a new account with admin user', async () => {
        const role = await rolesRepositoryInMemory.create({
            name: 'admin',
            description: 'Administrador',
        });

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
        expect(accountWithAdminUser.role.name).toEqual('admin');
    });

    it('should not be able to create an account with a user with non-existent role', () => {
        expect(
            createAccountWithAdminUserUseCase.execute({
                name: 'Teste name1',
                email: 'Teste email1',
                username: 'Teste username1',
                password: 'Teste password1',
                telefone: 'Teste telefone1',
                name_stablishment: 'Teste name stablishment1',
            }),
        ).rejects.toEqual(new AppError('Role not exists'));
    });
});
