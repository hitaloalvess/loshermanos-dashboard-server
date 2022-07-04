import { IUserWithRegisteredAccount } from '../../../../@types';
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { RolesRepositoryInMemory } from '../../repositories/in-memory/RolesRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import { CreateAccountWithAdminUserUseCase } from '../createAccountWithAdminUser/CreateAccountWithAdminUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let dayjsDateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;
let rolesRepositoryInMemory: RolesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

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
            rolesRepositoryInMemory,
        );

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
