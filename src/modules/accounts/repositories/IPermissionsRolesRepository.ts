import { PermissionRole } from '@prisma/client';

import { ICreatePermissionRoleDTO } from '../dtos/ICreatePermissionRoleDTO';

interface IPermissionsRolesRepository {
    create(data: ICreatePermissionRoleDTO): Promise<PermissionRole>;
}

export { IPermissionsRolesRepository };
