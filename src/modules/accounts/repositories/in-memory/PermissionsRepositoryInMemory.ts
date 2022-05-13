import { Permission } from '@prisma/client/';
import { v4 as uuid } from 'uuid';

import { ICreatePermissionDTO } from '../../dtos/ICreatePermissionDTO';
import { IPermissionsRepository } from '../IPermissionsRepository';

class PermissionsRepositoryInMemory implements IPermissionsRepository {
    private permissions: Permission[] = [];

    async create({
        name,
        description,
    }: ICreatePermissionDTO): Promise<Permission> {
        const permission: Permission = {
            id: uuid(),
            name,
            description,
            created_at: new Date(),
        };

        this.permissions.push(permission);

        return Promise.resolve(permission);
    }

    async findByName(name: string): Promise<Permission | undefined | null> {
        return Promise.resolve(
            this.permissions.find(permission => permission.name === name),
        );
    }

    findById(id: string): Promise<Permission | undefined | null> {
        return Promise.resolve(
            this.permissions.find(permission => permission.id === id),
        );
    }
}

export { PermissionsRepositoryInMemory };
