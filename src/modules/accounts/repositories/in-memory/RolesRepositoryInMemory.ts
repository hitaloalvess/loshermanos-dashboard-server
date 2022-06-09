import { Role } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ICreateRoleDTO } from '../../dtos/ICreateRoleDTO';
import { IRolesRepository } from '../IRolesRepository';

class RolesRepositoryInMemory implements IRolesRepository {
    private roles: Role[] = [];

    async create({
        name,
        description,
        id_account,
    }: ICreateRoleDTO): Promise<Role> {
        const role: Role = {
            id: uuid(),
            name,
            description,
            created_at: new Date(),
            id_account,
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

    async findAll(id_account: string): Promise<Role[]> {
        const roles = this.roles.filter(role => role.id_account === id_account);

        return Promise.resolve(roles);
    }
}

export { RolesRepositoryInMemory };
