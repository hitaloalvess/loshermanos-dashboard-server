import { Permission, PrismaClient } from '@prisma/client';

import { prismaClient } from '../../../../database/prismaClient';
import { ICreatePermissionDTO } from '../../dtos/ICreatePermissionDTO';
import { IPermissionsRepository } from '../IPermissionsRepository';

class PermissionsRepository implements IPermissionsRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaClient;
    }

    async create({
        name,
        description,
    }: ICreatePermissionDTO): Promise<Permission> {
        const permission = this.repository.permission.create({
            data: {
                name,
                description,
            },
        });

        return permission;
    }

    async findByName(name: string): Promise<Permission | undefined | null> {
        return this.repository.permission.findFirst({
            where: {
                name,
            },
        });
    }

    async findById(id: string): Promise<Permission | null | undefined> {
        return this.repository.permission.findFirst({
            where: {
                id,
            },
        });
    }
}

export { PermissionsRepository };
