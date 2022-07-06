import { Account, User } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ListUsersLinkedToAccountUseCase } from './ListUsersLinkedToAccountUseCase';

let accountsRepositoryInMemory: IAccountsRepository;
let usersRepositoryInMemory: IUsersRepository;

let listUsersLinkedToAccountUseCase: ListUsersLinkedToAccountUseCase;

let account: Account;
let user: User;
describe('List users linked to account', () => {
    beforeEach(async () => {
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();

        listUsersLinkedToAccountUseCase = new ListUsersLinkedToAccountUseCase(
            usersRepositoryInMemory,
            accountsRepositoryInMemory,
        );

        account = await accountsRepositoryInMemory.create({
            name_stablishment: 'TesteTeste',
        });

        user = await usersRepositoryInMemory.create({
            name: 'Teste',
            email: 'teste@teste.com',
            username: 'teste123',
            password: '12345',
            telefone: '21344324',
            id_account: account.id as string,
        });
    });

    it('should be able to list all users linked to account', async () => {
        const users = await listUsersLinkedToAccountUseCase.execute({
            id_account: account.id as string,
        });

        expect(users).toEqual([user]);
    });

    it('should not be able to list users from a non-existent account', async () => {
        await expect(
            listUsersLinkedToAccountUseCase.execute({
                id_account: 'incorrectID',
            }),
        ).rejects.toEqual(new AppError('Account does not exists'));
    });
});
