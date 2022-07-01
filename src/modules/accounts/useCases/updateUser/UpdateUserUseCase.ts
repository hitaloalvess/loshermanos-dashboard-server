import { inject, injectable } from 'tsyringe';

import { User } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    id_user: string;
    data: {
        name: string;
        email: string;
        username: string;
        password: string;
        id_role: string;
        telefone: string;
    };
}

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({
        id_user,
        data: { name, email, username, password, id_role, telefone },
    }: IRequest): Promise<User> {
        const userExists = await this.usersRepository.findById(id_user);

        if (!userExists) {
            throw new AppError('User does not exists');
        }

        const newUser = await this.usersRepository.updateUser({
            id_user,
            data: {
                name,
                email,
                username,
                password,
                id_role,
                telefone,
            },
        });

        return newUser;
    }
}

export { UpdateUserUseCase };
