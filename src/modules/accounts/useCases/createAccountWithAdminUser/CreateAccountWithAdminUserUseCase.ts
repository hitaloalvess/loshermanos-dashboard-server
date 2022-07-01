import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUserWithRegisteredAccount } from '../../../../@types';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { IRolesRepository } from '../../repositories/IRolesRepository';
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

        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,

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
    }: IRequest): Promise<IUserWithRegisteredAccount> {
        const account = await this.accountsReposository.create({
            name_stablishment,
        });

        let role = await this.rolesRepository.findByName('admin');

        if (!role) {
            role = await this.rolesRepository.create({
                name: 'admin',
                description: 'Administrador',
                id_account: account.id as string,
            });
        }

        const passwordHash = await hash(password, 8);
        const user = await this.usersRepository.create({
            name,
            email,
            username,
            password: passwordHash,
            telefone,
            id_account: account.id as string,
            id_role: role.id as string,
        });

        const userWithRegisteredAccount: IUserWithRegisteredAccount = {
            ...user,
            account: {
                ...account,
            },
            role: {
                ...role,
            },
        };

        return userWithRegisteredAccount;
    }
}

export { CreateAccountWithAdminUserUseCase };
