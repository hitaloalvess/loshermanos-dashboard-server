import { PrismaClient, User } from '@prisma/client';

import { IUserWithRegisteredAccount } from '../../../../@types';
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
        telefone,
        id_account,
        id_role,
    }: ICreateUserDTO): Promise<User> {
        const user = await this.repository.user.create({
            data: {
                name,
                email,
                username,
                password,
                telefone,
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

    async findById(id: string): Promise<User | null | undefined> {
        return this.repository.user.findFirst({
            where: {
                id,
            },
        });
    }

    async listUserAndRoleAndAccountDataById(
        id_user: string,
    ): Promise<IUserWithRegisteredAccount | null | undefined> {
        return this.repository.user.findFirst({
            where: {
                id: id_user,
            },
            include: {
                role: true,
                account: true,
            },
        });
    }

    async findByAccountId(id_account: string): Promise<User[]> {
        return this.repository.user.findMany({
            where: {
                id_account,
            },
        });
    }
}

export { UsersRepository };
