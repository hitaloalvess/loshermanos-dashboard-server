import { Account, Role, User } from '../../../../database/entities';
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

        account = await accountsRepositoryInMemory.create({
            name_stablishment: 'LosHermanos',
        });

        roleAtendente = await rolesRepositoryInMemory.create({
            name: 'atendent',
            description: 'Atendente',
            id_account: account.id as string,
        });

        roleAdmin = await rolesRepositoryInMemory.create({
            name: 'admin',
            description: 'Administrador',
            id_account: account.id as string,
        });

        user = await usersRepositoryInMemory.create({
            name: 'Teste',
            email: 'teste@teste.com',
            username: 'teste123',
            password: '12345',
            telefone: '11111',
            id_role: roleAtendente.id as string,
            id_account: account.id as string,
        });
    });

    it('should be able to update user', async () => {
        const data = {
            name: 'Hitalo Alves',
            email: 'hitalo.ralves@outlook.com',
            username: 'hitalo123',
            password: 'fut10@gol',
            id_role: roleAdmin.id as string,
            telefone: 'XXXXX',
        };

        const newUser = await updateUserUseCase.execute({
            id_user: user.id as string,
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
            id_role: roleAdmin.id as string,
            telefone: 'XXXXX',
        };

        expect(
            updateUserUseCase.execute({ id_user: 'asdewada', data }),
        ).rejects.toEqual(new AppError('User does not exists'));
    });
});
