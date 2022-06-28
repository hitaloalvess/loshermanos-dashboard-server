import { Account } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { RolesRepositoryInMemory } from '../../repositories/in-memory/RolesRepositoryInMemory';
import { IRolesRepository } from '../../repositories/IRolesRepository';
import { CreateAccountUseCase } from '../createAccount/CreateAccountUseCase';
import { CreateRoleUseCase } from './CreateRoleUseCase';

let rolesRepositoryInMemory: IRolesRepository;
let accountsRepositoryInMemory: IAccountsRepository;

let createAccountUseCase: CreateAccountUseCase;
let createRoleUseCase: CreateRoleUseCase;

let accountMock: Account;
describe('Create role', () => {
    beforeEach(async () => {
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();
        rolesRepositoryInMemory = new RolesRepositoryInMemory();

        createAccountUseCase = new CreateAccountUseCase(
            accountsRepositoryInMemory,
        );

        createRoleUseCase = new CreateRoleUseCase(
            accountsRepositoryInMemory,
            rolesRepositoryInMemory,
        );

        accountMock = await createAccountUseCase.execute({
            name_stablishment: 'Teste',
        });
    });

    it('it should be able to create a new role', async () => {
        const role = await createRoleUseCase.execute({
            name: 'admin',
            description: 'Administrador',
            id_account: accountMock.id as string,
        });

        expect(role).toHaveProperty('id');
    });

    it('should not be able to create a role with an already existing name', async () => {
        await createRoleUseCase.execute({
            name: 'admin',
            description: 'Administrador',
            id_account: accountMock.id as string,
        });

        await expect(
            createRoleUseCase.execute({
                name: 'admin',
                description: 'Administrador 1',
                id_account: accountMock.id as string,
            }),
        ).rejects.toEqual(new AppError('Role already exists'));
    });

    it('should not be able to create a new role for non-existent account', async () => {
        await expect(
            createRoleUseCase.execute({
                name: 'admin',
                description: 'Administrador',
                id_account: 'incorrectID',
            }),
        ).rejects.toEqual(new AppError('Account does not exists'));
    });
});
