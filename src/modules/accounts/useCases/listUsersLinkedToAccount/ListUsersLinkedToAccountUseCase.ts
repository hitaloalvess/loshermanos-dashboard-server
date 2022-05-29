import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    id_account: string;
}

@injectable()
class ListUsersLinkedToAccountUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,
    ) {}

    async execute({ id_account }: IRequest): Promise<User[]> {
        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Account does not exists');
        }

        const users = await this.usersRepository.listUsersByAccountId(
            id_account,
        );

        return users;
    }
}

export { ListUsersLinkedToAccountUseCase };
