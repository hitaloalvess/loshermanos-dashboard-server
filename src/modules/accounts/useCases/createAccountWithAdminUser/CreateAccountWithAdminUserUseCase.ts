import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '../../../../database/entities';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    username: string;
    password: string;
    telefone: string;
    name_stablishment: string;
}

@injectable()
class CreateAccountWithAdminUserUseCase {
    constructor(
        @inject('AccountsRepository')
        private accountsReposository: IAccountsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({
        name,
        email,
        username,
        password,
        telefone,
        name_stablishment,
    }: IRequest): Promise<User> {
        const account = await this.accountsReposository.create({
            name_stablishment,
        });

        const passwordHash = await hash(password, 8);
        const user = await this.usersRepository.create({
            name,
            email,
            username,
            password: passwordHash,
            telefone,
            id_account: account.id as string,
        });

        const userWithRegisteredAccount: User = {
            ...user,
            account: {
                ...account,
            },
        };

        return userWithRegisteredAccount;
    }
}

export { CreateAccountWithAdminUserUseCase };
