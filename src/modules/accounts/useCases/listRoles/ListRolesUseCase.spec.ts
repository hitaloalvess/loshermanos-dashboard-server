import { Account, Role } from '@prisma/client';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '../../repositories/in-memory/AccountsRepositoryInMemory';
import { RolesRepositoryInMemory } from '../../repositories/in-memory/RolesRepositoryInMemory';
import { IRolesRepository } from '../../repositories/IRolesRepository';
import { CreateRoleUseCase } from '../createRole/CreateRoleUseCase';
import { ListRolesUseCase } from './ListRolesUseCase';

let rolesRepositoryInMemory: IRolesRepository;
let accountsRepositoryInMemory: IAccountsRepository;

let listRolesUseCase: ListRolesUseCase;
let createRoleUseCase: CreateRoleUseCase;

let accountMock: Account;
let roleMock: Role;
describe('List all roles', () => {
    beforeEach(async () => {
        rolesRepositoryInMemory = new RolesRepositoryInMemory();
        accountsRepositoryInMemory = new AccountsRepositoryInMemory();

        createRoleUseCase = new CreateRoleUseCase(
            accountsRepositoryInMemory,
            rolesRepositoryInMemory,
        );

        listRolesUseCase = new ListRolesUseCase(
            accountsRepositoryInMemory,
            rolesRepositoryInMemory,
        );

        accountMock = await accountsRepositoryInMemory.create({
            name_stablishment: 'Teste',
        });

        roleMock = await createRoleUseCase.execute({
            name: 'admin',
            description: 'Administrador',
            id_account: accountMock.id,
        });
    });

    it('should be able to list all roles', async () => {
        const roles = await listRolesUseCase.execute({
            id_account: accountMock.id,
        });

        expect(roles).toEqual([roleMock]);
    });

    it('should not be able to list all non-existing account roles', async () => {
        await expect(
            listRolesUseCase.execute({
                id_account: 'incorrectID',
            }),
        ).rejects.toEqual(new AppError('Account does not exists'));
    });
});
