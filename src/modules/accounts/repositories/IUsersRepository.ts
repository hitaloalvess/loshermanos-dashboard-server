import { User } from '@prisma/client';

import { IUserWithRegisteredAccount } from '../../../@types';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findByUsername(username: string): Promise<User | undefined | null>;
}

export { IUsersRepository };
