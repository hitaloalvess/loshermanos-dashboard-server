import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { DeleteUserUseCase } from './DeleteUserUseCase';

let usersRepositoryInMemory: IUsersRepository;
let accountsRepositoryInMemory: IAccountsRepository;

let deleteUserUseCase: DeleteUserUseCase;

describe('Delete user', () => {
    beforeEach(async () => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();

        deleteUserUseCase = new DeleteUserUseCase(usersRepositoryInMemory);
    });

    it('should be able to delete user', async () => {
        const account = await accountsRepositoryInMemory.create({
            name_stablishment: 'Teste',
        });

        const user = await usersRepositoryInMemory.create({
            name: 'Teste',
            email: 'teste@teste.com',
            username: 'teste123',
            password: '123455',
            telefone: '123455',
            id_account: account.id as string,
        });

        const userDelete = await deleteUserUseCase.execute(user.id as string);
        const listUsers = await usersRepositoryInMemory.listUsersByAccountId(
            account.id as string,
        );

        expect(listUsers).not.toContainEqual(userDelete);
    });

    it('should not be able to delete a non-existent user', async () => {
        expect(deleteUserUseCase.execute('sadhuwekfds')).rejects.toEqual(
            new AppError('User does not exists'),
        );
    });
});
