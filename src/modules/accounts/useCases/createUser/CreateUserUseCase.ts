import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { IRolesRepository } from '../../repositories/IRolesRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    username: string;
    password: string;
    telefone: string;
    id_account: string;
    id_role: string;
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,

        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    async execute({
        name,
        email,
        username,
        password,
        telefone,
        id_account,
        id_role,
    }: IRequest): Promise<User> {
        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Account not exist');
        }

        const roleExists = await this.rolesRepository.findById(id_role);

        if (!roleExists) {
            throw new AppError('Role not exist');
        }

        const usernameExists = await this.usersRepository.findByUsername(
            username,
        );

        if (usernameExists) {
            throw new AppError('Username already exists');
        }

        const user = await this.usersRepository.create({
            name,
            email,
            username,
            password,
            telefone,
            id_account,
            id_role,
        });

        return user;
    }
}

export { CreateUserUseCase };
