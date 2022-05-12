import { Role } from '@prisma/client/index';

import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';

interface IRolesRepository {
    create(data: ICreateRoleDTO): Promise<Role>;
    findByName(name: string): Promise<Role | undefined | null>;
}

export { IRolesRepository };
