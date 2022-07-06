import { Account, User } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';

let usersRepositoryInMemory: IUsersRepository;
let accountsRepositoryInMemory: IAccountsRepository;

let updateUserUseCase: UpdateUserUseCase;

let user: User;
let account: Account;
describe('Update user', () => {
    beforeEach(async () => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();

        updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory);

        account = await accountsRepositoryInMemory.create({
            name_stablishment: 'LosHermanos',
        });

        user = await usersRepositoryInMemory.create({
            name: 'Teste',
            email: 'teste@teste.com',
            username: 'teste123',
            password: '12345',
            telefone: '11111',
            id_account: account.id as string,
        });
    });

    it('should be able to update user', async () => {
        const data = {
            name: 'Hitalo Alves',
            email: 'hitalo.ralves@outlook.com',
            username: 'hitalo123',
            password: 'fut10@gol',
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
            telefone: 'XXXXX',
        };

        expect(
            updateUserUseCase.execute({ id_user: 'asdewada', data }),
        ).rejects.toEqual(new AppError('User does not exists'));
    });
});
