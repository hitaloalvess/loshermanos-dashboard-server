import { User } from '@prisma/client';
import { v4 as uuid } from 'uuid';

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
}

export { UsersRepositoryInMemory };
