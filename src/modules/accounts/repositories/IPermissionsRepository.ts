import { Permission } from '@prisma/client/index';

import { ICreatePermissionDTO } from '../dtos/ICreatePermissionDTO';

interface IPermissionsRepository {
    create(data: ICreatePermissionDTO): Promise<Permission>;
    findByName(name: string): Promise<Permission | undefined | null>;
}

export { IPermissionsRepository };
