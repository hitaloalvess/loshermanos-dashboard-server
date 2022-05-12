import { AppError } from '../../../../shared/errors/AppError';
import { RolesRepositoryInMemory } from '../../repositories/in-memory/RolesRepositoryInMemory';
import { CreateRoleUseCase } from './CreateRoleUseCase';

let createRoleUseCase: CreateRoleUseCase;
let rolesRepositoryInMemory: RolesRepositoryInMemory;

describe('Create role', () => {
    beforeEach(() => {
        rolesRepositoryInMemory = new RolesRepositoryInMemory();
        createRoleUseCase = new CreateRoleUseCase(rolesRepositoryInMemory);
    });

    it('it should be able to create a new role', async () => {
        const role = await createRoleUseCase.execute({
            name: 'admin',
            description: 'Administrador',
        });

        expect(role).toHaveProperty('id');
    });

    it('should not be able to create a role with an already existing name', async () => {
        await createRoleUseCase.execute({
            name: 'admin',
            description: 'Administrador',
        });

        expect(
            createRoleUseCase.execute({
                name: 'admin',
                description: 'Administrador 1',
            }),
        ).rejects.toEqual(new AppError('Role already exists'));
    });
});
