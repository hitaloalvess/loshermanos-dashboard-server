import { IUserWithRegisteredAccount } from '../../../../@types';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { RolesRepositoryInMemory } from '../../repositories/in-memory/RolesRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import { IRolesRepository } from '../../repositories/IRolesRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';
import { CreateAccountWithAdminUserUseCase } from '../createAccountWithAdminUser/CreateAccountWithAdminUserUseCase';
import { CreateRoleUseCase } from '../createRole/CreateRoleUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let dayjsDateProvider: IDateProvider;
let usersTokensRepositoryInMemory: IUsersTokensRepository;
let accountsRepositoryInMemory: IAccountsRepository;
let rolesRepositoryInMemory: IRolesRepository;
let usersRepositoryInMemory: IUsersRepository;

let createRoleUseCase: CreateRoleUseCase;
let createAccountWithAdminUserUseCase: CreateAccountWithAdminUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

let user: IUserWithRegisteredAccount;
describe('Authenticate user', () => {
    beforeEach(async () => {
        dayjsDateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
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
            dayjsDateProvider,
            usersTokensRepositoryInMemory,
        );

        await createRoleUseCase.execute({
            name: 'admin',
            description: 'Administrador',
        });

        user = await createAccountWithAdminUserUseCase.execute({
            name: 'Teste',
            email: 'teste@teste',
            username: 'Teste123',
            password: 'teste123',
            telefone: '12345',
            name_stablishment: 'Teste stablishment',
        });
    });

    it('should be able to authenticate an user', async () => {
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
                password: user.password,
            }),
        ).rejects.toEqual(new AppError('Username or password incorrect', 401));
    });

    it('should not be able to authenticate with incorrect password', async () => {
        await expect(
            authenticateUserUseCase.execute({
                username: user.username,
                password: 'incorrectPassword',
            }),
        ).rejects.toEqual(new AppError('Username or password incorrect', 401));
    });
});
