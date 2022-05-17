import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { CreateAccountUseCase } from './CreateAccountUseCase';

let createAccountUseCase: CreateAccountUseCase;
let accountsRepositoryInMemory: IAccountsRepository;

describe('Create new account', () => {
    beforeEach(() => {
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        createAccountUseCase = new CreateAccountUseCase(
            accountsRepositoryInMemory,
        );
    });

    it('should be able to create a new account', async () => {
        const account = await createAccountUseCase.execute({
            name_stablishment: 'LosHermanos',
        });

        expect(account).toHaveProperty('id');
    });

    it('should not be able to create a new account with name stablishment existent', async () => {
        await createAccountUseCase.execute({
            name_stablishment: 'LosHermanos1',
        });

        expect(
            createAccountUseCase.execute({
                name_stablishment: 'LosHermanos1',
            }),
        ).rejects.toEqual(
            new AppError('Account with that business name already exists'),
        );
    });
});
