import { IUserWithRegisteredAccount } from '../../../../@types';
import { AppError } from '../../../../shared/errors/AppError';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { RolesRepositoryInMemory } from '../../repositories/in-memory/RolesRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateAccountWithAdminUserUseCase } from '../createAccountWithAdminUser/CreateAccountWithAdminUserUseCase';
import { CreateRoleUseCase } from '../createRole/CreateRoleUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let accountsRepositoryInMemory: AccountsRepositoryInMemory;
let rolesRepositoryInMemory: RolesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let createRoleUseCase: CreateRoleUseCase;
let createAccountWithAdminUserUseCase: CreateAccountWithAdminUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate user', () => {
    beforeEach(async () => {
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        rolesRepositoryInMemory = new RolesRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();

        createRoleUseCase = new CreateRoleUseCase(rolesRepositoryInMemory);
        createAccountWithAdminUserUseCase =
            new CreateAccountWithAdminUserUseCase(
                accountsRepositoryInMemory,
                rolesRepositoryInMemory,
                usersRepositoryInMemory,
            );

        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
        );

        await createRoleUseCase.execute({
            name: 'admin',
            description: 'Administrador',
        });
    });

    it('should be able to authenticate an user', async () => {
        const user = await createAccountWithAdminUserUseCase.execute({
            name: 'Teste',
            email: 'teste@teste',
            username: 'Teste123',
            password: 'teste123',
            telefone: '12345',
            name_stablishment: 'Teste stablishment',
        });

        const result = await authenticateUserUseCase.execute({
            username: user.username,
            password: 'teste123',
        });

        expect(result).toHaveProperty('token');
    });

    it('should not be able to authenticate an nonexistent user', async () => {
        await expect(
            authenticateUserUseCase.execute({
                username: 'Teste12345',
                password: '1234',
            }),
        ).rejects.toEqual(new AppError('Username or password incorrect', 401));
    });

    it('should not be able to authenticate with incorrect password', async () => {
        await expect(
            authenticateUserUseCase.execute({
                username: 'Teste123',
                password: 'incorrectPassword',
            }),
        ).rejects.toEqual(new AppError('Username or password incorrect', 401));
    });
});
