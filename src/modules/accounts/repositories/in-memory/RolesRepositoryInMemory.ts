import { Role } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ICreateRoleDTO } from '../../dtos/ICreateRoleDTO';
import { IRolesRepository } from '../IRolesRepository';

class RolesRepositoryInMemory implements IRolesRepository {
    private roles: Role[] = [];

    async create({ name, description }: ICreateRoleDTO): Promise<Role> {
        const role: Role = {
            id: uuid(),
            name,
            description,
            created_at: new Date(),
        };

        this.roles.push(role);

        return Promise.resolve(role);
    }

    async findByName(name: string): Promise<Role> {
        const role = this.roles.find(role => role.name === name) as Role;

        return Promise.resolve(role);
    }

    async findById(id: string): Promise<Role> {
        const role = this.roles.find(role => role.id === id) as Role;

        return Promise.resolve(role);
    }
}

export { RolesRepositoryInMemory };
