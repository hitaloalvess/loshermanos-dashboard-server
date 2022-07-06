import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    username: string;
    password: string;
    telefone: string;
    admin?: boolean;
    id_account: string;
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,
    ) {}

    async execute({
        name,
        email,
        username,
        password,
        telefone,
        admin,
        id_account,
    }: IRequest): Promise<User> {
        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Account not exist');
        }

        const usernameExists = await this.usersRepository.findByUsername(
            username,
        );

        if (usernameExists) {
            throw new AppError('Username already exists');
        }

        const passwordHash = await hash(password, 8);
        const user = await this.usersRepository.create({
            name,
            email,
            username,
            password: passwordHash,
            telefone,
            admin,
            id_account,
        });

        return user;
    }
}

export { CreateUserUseCase };
