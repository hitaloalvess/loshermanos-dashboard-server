import { User } from '@prisma/client';

import { IUserWithRegisteredAccount } from '../../../@types';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findByUsername(username: string): Promise<User | undefined | null>;
    findById(id: string): Promise<User | undefined | null>;
    listUserAndRoleAndAccountDataById(
        id_user: string,
    ): Promise<IUserWithRegisteredAccount | undefined | null>;
    findByAccountId(id_account: string): Promise<User[]>;
    updateUser(data: IUpdateUserDTO): Promise<User>;
}

export { IUsersRepository };
