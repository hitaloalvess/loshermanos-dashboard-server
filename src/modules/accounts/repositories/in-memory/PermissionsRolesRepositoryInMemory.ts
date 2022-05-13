import { PermissionRole } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ICreatePermissionRoleDTO } from '../../dtos/ICreatePermissionRoleDTO';
import { IPermissionsRolesRepository } from '../IPermissionsRolesRepository';

class PermissionsRolesRepositoryInMemory
    implements IPermissionsRolesRepository
{
    private permissionRole: PermissionRole[] = [];

    async create({
        id_permission,
        id_role,
    }: ICreatePermissionRoleDTO): Promise<PermissionRole> {
        const permissionRole: PermissionRole = {
            id: uuid(),
            id_permission,
            id_role,
        };

        this.permissionRole.push(permissionRole);

        return Promise.resolve(permissionRole);
    }
}

export { PermissionsRolesRepositoryInMemory };
