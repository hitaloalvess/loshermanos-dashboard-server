import { User } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
    private repository;

    constructor() {
        this.repository = prismaClient;
    }

    async create({
        name,
        email,
        username,
        password,
        telefone,
        admin,
        id_account,
    }: ICreateUserDTO): Promise<User> {
        const user = await this.repository.user.create({
            data: {
                name,
                email,
                username,
                password,
                telefone,
                admin,
                id_account,
            },
        });

        return user;
    }

    async findByUsername(username: string): Promise<User> {
        return (await this.repository.user.findFirst({
            where: {
                username,
            },
        })) as User;
    }

    async findById(id: string): Promise<User> {
        return (await this.repository.user.findFirst({
            where: {
                id,
            },
        })) as User;
    }

    async listUserAndAccountDataById(id_user: string): Promise<User> {
        return (await this.repository.user.findFirst({
            where: {
                id: id_user,
            },
            include: {
                account: true,
            },
        })) as User;
    }

    async listUsersByAccountId(id_account: string): Promise<User[]> {
        return this.repository.user.findMany({
            where: {
                id_account,
            },
        });
    }

    async updateUser({ id_user, data }: IUpdateUserDTO): Promise<User> {
        const newUser = await this.repository.user.update({
            where: {
                id: id_user,
            },
            data,
        });

        return newUser;
    }

    async deleteUserById(id_user: string): Promise<User> {
        const user = await this.repository.user.delete({
            where: {
                id: id_user,
            },
        });

        return user;
    }
}

export { UsersRepository };
