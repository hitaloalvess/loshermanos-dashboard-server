import { PrismaClient, User } from '@prisma/client';

import { prismaClient } from '../../../../database/prismaClient';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaClient;
    }

    async create({
        name,
        email,
        username,
        password,
        id_account,
        id_role,
    }: ICreateUserDTO): Promise<User> {
        const user = await this.repository.user.create({
            data: {
                name,
                email,
                username,
                password,
                id_account,
                id_role,
            },
        });

        return user;
    }

    async findByUsername(username: string): Promise<User | null | undefined> {
        return this.repository.user.findFirst({
            where: {
                username,
            },
        });
    }
}

export { UsersRepository };
