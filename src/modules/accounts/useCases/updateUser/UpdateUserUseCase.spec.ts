import { Account, Role, User } from '@prisma/client';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { RolesRepositoryInMemory } from '../../repositories/in-memory/RolesRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IRolesRepository } from '../../repositories/IRolesRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';

let usersRepositoryInMemory: IUsersRepository;
let accountsRepositoryInMemory: IAccountsRepository;
let rolesRepositoryInMemory: IRolesRepository;

let updateUserUseCase: UpdateUserUseCase;

let user: User;
let account: Account;
let roleAtendente: Role;
let roleAdmin: Role;
describe('Update user', () => {
    beforeEach(async () => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        rolesRepositoryInMemory = new RolesRepositoryInMemory();

        updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory);

        roleAtendente = await rolesRepositoryInMemory.create({
            name: 'atendent',
            description: 'Atendente',
        });

        roleAdmin = await rolesRepositoryInMemory.create({
            name: 'admin',
            description: 'Administrador',
        });

        account = await accountsRepositoryInMemory.create({
            name_stablishment: 'LosHermanos',
        });

        user = await usersRepositoryInMemory.create({
            name: 'Teste',
            email: 'teste@teste.com',
            username: 'teste123',
            password: '12345',
            telefone: '11111',
            id_role: roleAtendente.id,
            id_account: account.id,
        });
    });

    it('should be able to update user', async () => {
        const data = {
            name: 'Hitalo Alves',
            email: 'hitalo.ralves@outlook.com',
            username: 'hitalo123',
            password: 'fut10@gol',
            id_role: roleAdmin.id,
            telefone: 'XXXXX',
        };

        const newUser = await updateUserUseCase.execute({
            id_user: user.id,
            data,
        });

        expect(newUser).toHaveProperty('id');
    });

    it('should not be able to update a non-existent user', () => {
        const data = {
            name: 'Hitalo Alves',
            email: 'hitalo.ralves@outlook.com',
            username: 'hitalo123',
            password: 'fut10@gol',
            id_role: roleAdmin.id,
            telefone: 'XXXXX',
        };

        expect(
            updateUserUseCase.execute({ id_user: 'asdewada', data }),
        ).rejects.toEqual(new AppError('User does not exists'));
    });
});
