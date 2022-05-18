import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    id_user: string;
    id_account: string;
}

@injectable()
class DeleteUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}
    async execute(id_user: string): Promise<User> {
        const userExists = await this.usersRepository.findById(id_user);

        if (!userExists) {
            throw new AppError('User does not exists');
        }

        const user = await this.usersRepository.deleteUserById(id_user);

        return user;
    }
}

export { DeleteUserUseCase };
