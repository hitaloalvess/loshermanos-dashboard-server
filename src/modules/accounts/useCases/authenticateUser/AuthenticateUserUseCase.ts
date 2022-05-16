import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    username: string;
    password: string;
}

interface IResponse {
    token: string;
    user: {
        name: string;
        email: string;
        username: string;
        telefone: string;
    };
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({ username, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByUsername(username);
        const { secret_token, expires_in_token } = auth;

        if (!user) {
            throw new AppError('Username or password incorrect', 401);
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError('Username or password incorrect', 401);
        }

        const token = sign({}, secret_token, {
            subject: user?.id,
            expiresIn: expires_in_token,
        });

        return {
            token,
            user: {
                name: user?.name,
                email: user?.email,
                username: user?.username,
                telefone: user?.telefone,
            },
        };
    }
}

export { AuthenticateUserUseCase };
