import { PermissionRole, PrismaClient } from '@prisma/client';

import { prismaClient } from '../../../../database/prismaClient';
import { ICreatePermissionRoleDTO } from '../../dtos/ICreatePermissionRoleDTO';
import { IPermissionsRolesRepository } from '../IPermissionsRolesRepository';

class PermissionsRolesRepository implements IPermissionsRolesRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaClient;
    }

    async create({
        id_permission,
        id_role,
    }: ICreatePermissionRoleDTO): Promise<PermissionRole> {
        const permission = await this.repository.permissionRole.create({
            data: {
                id_permission,
                id_role,
            },
        });

        return permission;
    }
}

export { PermissionsRolesRepository };
