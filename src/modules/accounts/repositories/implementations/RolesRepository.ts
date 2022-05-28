import { PrismaClient, Role } from '@prisma/client';

import { prismaClient } from '../../../../database/prismaClient';
import { ICreateRoleDTO } from '../../dtos/ICreateRoleDTO';
import { IRolesRepository } from '../IRolesRepository';

class RolesRepository implements IRolesRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaClient;
    }

    async create({ name, description }: ICreateRoleDTO): Promise<Role> {
        const role = this.repository.role.create({
            data: {
                name,
                description,
            },
        });

        return role;
    }

    async findByName(name: string): Promise<Role> {
        const role = (await this.repository.role.findFirst({
            where: {
                name,
            },
        })) as Role;

        return role;
    }

    async findById(id: string): Promise<Role> {
        const role = (await this.repository.role.findFirst({
            where: {
                id,
            },
        })) as Role;

        return role;
    }
}

export { RolesRepository };
