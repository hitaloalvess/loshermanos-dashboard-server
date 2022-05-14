import { Account, Role } from '@prisma/client';

import { AppError } from '../../../../shared/errors/AppError';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { RolesRepositoryInMemory } from '../../repositories/in-memory/RolesRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateAccountUseCase } from '../createAccount/CreateAccountUseCase';
import { CreateRoleUseCase } from '../createRole/CreateRoleUseCase';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let createAccountUseCase: CreateAccountUseCase;
let createRoleUseCase: CreateRoleUseCase;
let rolesRepositoryInMemory: RolesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;

let account: Account;
let role: Role;
describe('Create a new User', () => {
    beforeEach(async () => {
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        createAccountUseCase = new CreateAccountUseCase(
            accountsRepositoryInMemory,
        );
        rolesRepositoryInMemory = new RolesRepositoryInMemory();
        createRoleUseCase = new CreateRoleUseCase(rolesRepositoryInMemory);
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
        });
    });

    it('should be able to create a new user', async () => {
        const user = await createUserUseCase.execute({
            name: 'Hitalo',
            email: 'hitalo.ralves@hotmail.com',
            username: 'hitalo123',
            password: '12345',
            id_account: account.id,
            id_role: role.id,
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with username existent', async () => {
        await createUserUseCase.execute({
            name: 'Hitalo',
            email: 'hitalo.ralves@hotmail.com',
            username: 'hitalo123',
            password: '12345',
            id_account: account.id,
            id_role: role.id,
        });

        expect(
            createUserUseCase.execute({
                name: 'Teste',
                email: 'teste@hotmail.com',
                username: 'hitalo123',
                password: '1234222',
                id_account: account.id,
                id_role: role.id,
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
                id_account: 'teste',
                id_role: role.id,
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
                id_account: account.id,
                id_role: 'teste',
            }),
        ).rejects.toEqual(new AppError('Role not exist'));
    });
});
