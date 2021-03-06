import { User } from '../../../database/entities';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findByUsername(username: string): Promise<User>;
    findById(id: string): Promise<User>;
    listUserAndAccountDataById(id_user: string): Promise<User>;
    listUsersByAccountId(id_account: string): Promise<User[]>;
    updateUser(data: IUpdateUserDTO): Promise<User>;
    deleteUserById(id_user: string): Promise<User>;
}

export { IUsersRepository };
