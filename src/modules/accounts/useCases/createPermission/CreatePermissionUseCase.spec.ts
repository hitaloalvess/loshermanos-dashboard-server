import { AppError } from '../../../../shared/errors/AppError';
import { PermissionsRepositoryInMemory } from '../../repositories/in-memory/PermissionsRepositoryInMemory';
import { IPermissionsRepository } from '../../repositories/IPermissionsRepository';
import { CreatePermissionUseCase } from './CreatePermissionUseCase';

let createPermissionUseCase: CreatePermissionUseCase;
let permissionsRepositoryInMemory: IPermissionsRepository;

describe('Create Permission', () => {
    beforeEach(() => {
        permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
        createPermissionUseCase = new CreatePermissionUseCase(
            permissionsRepositoryInMemory,
        );
    });

    it('should be able to create a new permission', async () => {
        const permission = await createPermissionUseCase.execute({
            name: 'admin',
            description: 'Administrador',
        });

        expect(permission).toHaveProperty('id');
    });

    it('should not be able to create a permission with an already existing name', async () => {
        await createPermissionUseCase.execute({
            name: 'admin',
            description: 'Administrador',
        });

        await expect(
            createPermissionUseCase.execute({
                name: 'admin',
                description: 'Administrador 1',
            }),
        ).rejects.toEqual(new AppError('Permission already exists'));
    });
});
