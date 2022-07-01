import { sign } from 'jsonwebtoken';

import auth from '../../../../config/auth';
import { Account } from '../../../../database/entities';
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
import { AuthenticateUserUseCase } from '../authenticateUser/AuthenticateUserUseCase';
import { CreateAccountWithAdminUserUseCase } from '../createAccountWithAdminUser/CreateAccountWithAdminUserUseCase';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

let usersTokensRepositoryInMemory: IUsersTokensRepository;
let dayjsDateProvider: IDateProvider;
let accountsReposositoryInMemory: IAccountsRepository;
let rolesRepositoryInMemory: IRolesRepository;
let usersRepositoryInMemory: IUsersRepository;

let refreshTokenUseCase: RefreshTokenUseCase;
let createAccountWithAdminUser: CreateAccountWithAdminUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

let account: Account;
describe('Refresh user token', () => {
    beforeEach(async () => {
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        accountsReposositoryInMemory = new AccountsRepositoryInMemory();
        rolesRepositoryInMemory = new RolesRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();

        refreshTokenUseCase = new RefreshTokenUseCase(
            usersTokensRepositoryInMemory,
            dayjsDateProvider,
        );

        createAccountWithAdminUser = new CreateAccountWithAdminUserUseCase(
            accountsReposositoryInMemory,
            rolesRepositoryInMemory,
            usersRepositoryInMemory,
        );

        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            dayjsDateProvider,
            usersTokensRepositoryInMemory,
            rolesRepositoryInMemory,
        );

        account = await accountsReposositoryInMemory.create({
            name_stablishment: 'Teste',
        });
    });

    it('should be able to refresh user token', async () => {
        await rolesRepositoryInMemory.create({
            name: 'admin',
            description: 'Administrador',
            id_account: account.id as string,
        });

        await createAccountWithAdminUser.execute({
            name: 'Teste',
            email: 'teste@teste.com',
            username: 'teste123',
            password: '12345',
            telefone: '123456',
            name_stablishment: 'TesteTeste',
        });

        const { refresh_token } = await authenticateUserUseCase.execute({
            username: 'teste123',
            password: '12345',
        });

        const result = await refreshTokenUseCase.execute(refresh_token);

        expect(result).toHaveProperty('token');
        expect(result).toHaveProperty('refresh_token');
    });

    it('should not be able to refresh an invalid user token', async () => {
        const refresh_token = sign(
            {
                username: 'teste123',
                email: 'teste@teste',
            },
            auth.secret_refresh_token,
            {
                subject: 'asdqw214easd',
                expiresIn: auth.expires_in_refresh_token,
            },
        );
        expect(refreshTokenUseCase.execute(refresh_token)).rejects.toEqual(
            new AppError('Refresh token does not exists!'),
        );
    });
});
