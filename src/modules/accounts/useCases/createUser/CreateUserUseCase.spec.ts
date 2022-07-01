import { Account, Role } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { RolesRepositoryInMemory } from '../../repositories/in-memory/RolesRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IRolesRepository } from '../../repositories/IRolesRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateAccountUseCase } from '../createAccount/CreateAccountUseCase';
import { CreateRoleUseCase } from '../createRole/CreateRoleUseCase';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let createAccountUseCase: CreateAccountUseCase;
let createRoleUseCase: CreateRoleUseCase;
let rolesRepositoryInMemory: IRolesRepository;
let usersRepositoryInMemory: IUsersRepository;
let accountsRepositoryInMemory: IAccountsRepository;

let account: Account;
let role: Role;
describe('Create a new User', () => {
    beforeEach(async () => {
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        createAccountUseCase = new CreateAccountUseCase(
            accountsRepositoryInMemory,
        );
        rolesRepositoryInMemory = new RolesRepositoryInMemory();
        createRoleUseCase = new CreateRoleUseCase(
            accountsRepositoryInMemory,
            rolesRepositoryInMemory,
        );
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory,
            accountsRepositoryInMemory,
            rolesRepositoryInMemory,
        );

        account = await createAccountUseCase.execute({
            name_stablishment: 'LosHermanos',
        });

        role = await createRoleUseCase.execute({
            name: 'admin',
            description: 'Administrador',
            id_account: account.id as string,
        });
    });

    it('should be able to create a new user', async () => {
        const user = await createUserUseCase.execute({
            name: 'Hitalo',
            email: 'hitalo.ralves@hotmail.com',
            username: 'hitalo123',
            password: '12345',
            telefone: '213213124',
            id_account: account.id as string,
            id_role: role.id as string,
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with username existent', async () => {
        await createUserUseCase.execute({
            name: 'Hitalo',
            email: 'hitalo.ralves@hotmail.com',
            username: 'hitalo123',
            password: '12345',
            telefone: '123243243',
            id_account: account.id as string,
            id_role: role.id as string,
        });

        expect(
            createUserUseCase.execute({
                name: 'Teste',
                email: 'teste@hotmail.com',
                username: 'hitalo123',
                password: '1234222',
                telefone: '12312432',
                id_account: account.id as string,
                id_role: role.id as string,
            }),
        ).rejects.toEqual(new AppError('Username already exists'));
    });

    it('should not be able to create a new user with account non-existent', async () => {
        expect(
            createUserUseCase.execute({
                name: 'Teste',
                email: 'teste@hotmail.com',
                username: 'hitalo123',
                password: '1234222',
                telefone: '12312412',
                id_account: 'teste',
                id_role: role.id as string,
            }),
        ).rejects.toEqual(new AppError('Account not exist'));
    });

    it('should not be able to create a new user with role non-existent', async () => {
        expect(
            createUserUseCase.execute({
                name: 'Teste',
                email: 'teste@hotmail.com',
                username: 'hitalo123',
                password: '1234222',
                telefone: '12312414',
                id_account: account.id as string,
                id_role: 'teste',
            }),
        ).rejects.toEqual(new AppError('Role not exist'));
    });
});
