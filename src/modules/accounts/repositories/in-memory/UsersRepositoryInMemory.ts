import { User } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { IUserWithRegisteredAccount } from '../../../../@types';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
    private users: User[] = [];
    create({
        name,
        email,
        username,
        password,
        telefone,
        id_account,
        id_role,
    }: ICreateUserDTO): Promise<User> {
        const user: User = {
            id: uuid(),
            name,
            email,
            username,
            password,
            telefone,
            created_at: new Date(),
            id_account,
            id_role,
        };

        this.users.push(user);

        return Promise.resolve(user);
    }

    async findByUsername(username: string): Promise<User | undefined | null> {
        return Promise.resolve(
            this.users.find(user => user.username === username),
        );
    }

    async findById(id: string): Promise<User | null | undefined> {
        return Promise.resolve(this.users.find(user => user.id === id));
    }

    async listUserAndRoleAndAccountDataById(
        id_user: string,
    ): Promise<IUserWithRegisteredAccount | null | undefined> {
        const user = this.users.find(user => user.id === id_user);

        if (!user) {
            return undefined;
        }

        return Promise.resolve({
            ...user,
            account: {
                id: user?.id_account,
                name_stablishment: 'Teste',
                created_at: new Date(),
            },
            role: {
                id: user?.id_role,
                name: 'Teste',
                description: 'Teste description',
                created_at: new Date(),
            },
        });
    }
}

export { UsersRepositoryInMemory };
