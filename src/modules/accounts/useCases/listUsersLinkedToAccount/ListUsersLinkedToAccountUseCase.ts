import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    id_account: string;
}

@injectable()
class ListUsersLinkedToAccountUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({ id_account }: IRequest): Promise<User[]> {
        const users = await this.usersRepository.findByAccountId(id_account);

        return users;
    }
}

export { ListUsersLinkedToAccountUseCase };
