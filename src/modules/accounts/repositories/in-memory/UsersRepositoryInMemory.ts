import { v4 as uuid } from 'uuid';

import { User } from '../../../../database/entities';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
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
        };

        this.users.push(user);

        return Promise.resolve(user);
    }

    async findByUsername(username: string): Promise<User> {
        return Promise.resolve(
            this.users.find(user => user.username === username) as User,
        );
    }

    async findById(id: string): Promise<User> {
        return Promise.resolve(this.users.find(user => user.id === id) as User);
    }

    async listUserAndAccountDataById(id_user: string): Promise<User> {
        const user = (await this.users.find(
            user => user.id === id_user,
        )) as User;

        return Promise.resolve({
            ...user,
            account: {
                id: user.id_account,
                name_stablishment: 'Teste',
                created_at: new Date(),
            },
        });
    }

    async listUsersByAccountId(id_account: string): Promise<User[]> {
        const users = this.users.filter(user => user.id_account === id_account);

        return Promise.resolve(users);
    }

    async updateUser({
        id_user,
        data: { name, email, username, password, telefone },
    }: IUpdateUserDTO): Promise<User> {
        const user = this.users.find(user => user.id === id_user) as User;

        const index = this.users.indexOf(user);

        const newUser = {
            ...user,
            name,
            email,
            username,
            password,
            telefone,
        };

        this.users.splice(index, 1, newUser);

        return Promise.resolve(newUser);
    }

    async deleteUserById(id_user: string): Promise<User> {
        const user = this.users.find(user => user.id === id_user) as User;

        const index = this.users.indexOf(user);

        this.users.splice(index, 1);

        return Promise.resolve(user);
    }
}

export { UsersRepositoryInMemory };
