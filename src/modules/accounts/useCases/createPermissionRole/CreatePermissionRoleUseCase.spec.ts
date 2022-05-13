import { AppError } from '../../../../shared/errors/AppError';
import { PermissionsRepositoryInMemory } from '../../repositories/in-memory/PermissionsRepositoryInMemory';
import { PermissionsRolesRepositoryInMemory } from '../../repositories/in-memory/PermissionsRolesRepositoryInMemory';
import { RolesRepositoryInMemory } from '../../repositories/in-memory/RolesRepositoryInMemory';
import { CreatePermissionRoleUseCase } from './CreatePermissionRoleUseCase';

let createPermissionRoleUseCase: CreatePermissionRoleUseCase;
let rolesRepositoryInMemory: RolesRepositoryInMemory;
let permissionsRepositoryInMemory: PermissionsRepositoryInMemory;
let permissionsRolesRepositoryInMemory: PermissionsRolesRepositoryInMemory;

describe('Create relationship between permission and role', () => {
    beforeEach(() => {
        permissionsRolesRepositoryInMemory =
            new PermissionsRolesRepositoryInMemory();
        rolesRepositoryInMemory = new RolesRepositoryInMemory();
        permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
        createPermissionRoleUseCase = new CreatePermissionRoleUseCase(
            permissionsRolesRepositoryInMemory,
            rolesRepositoryInMemory,
            permissionsRepositoryInMemory,
        );
    });

    it('should be able to create a relationship between permission and role', async () => {
        const role = await rolesRepositoryInMemory.create({
            name: 'teste',
            description: 'Teste',
        });

        const permission = await permissionsRepositoryInMemory.create({
            name: 'teste1',
            description: 'Teste1',
        });

        const permissionRole = await createPermissionRoleUseCase.execute({
            id_permission: permission.id,
            id_role: role.id,
        });

        expect(permissionRole).toHaveProperty('id');
    });

    it('should not be able to create a relationship between permission and a non-existent role', async () => {
        const permission = await permissionsRepositoryInMemory.create({
            name: 'teste1',
            description: 'Teste1',
        });

        expect(
            createPermissionRoleUseCase.execute({
                id_permission: permission.id,
                id_role: '10',
            }),
        ).rejects.toEqual(new AppError("Role don't not exists"));
    });

    it('should not be able to create a relationship between role and a non-existent permission', async () => {
        const role = await rolesRepositoryInMemory.create({
            name: 'teste',
            description: 'Teste',
        });

        expect(
            createPermissionRoleUseCase.execute({
                id_permission: '1',
                id_role: role.id,
            }),
        ).rejects.toEqual(new AppError("Permission don't not exists"));
    });
});
