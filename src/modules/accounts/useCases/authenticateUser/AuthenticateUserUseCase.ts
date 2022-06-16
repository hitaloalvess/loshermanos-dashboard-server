import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IRolesRepository } from '../../repositories/IRolesRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

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
        role: {
            id: string;
            name: string;
            description: string;
        };
        id_account: string;
    };
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('DayjsDateProvider')
        private dayjsDateProvider: IDateProvider,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    async execute({ username, password }: IRequest): Promise<IResponse> {
        const user = (await this.usersRepository.findByUsername(
            username,
        )) as User;

        const {
            secret_token,
            expires_in_token,
            secret_refresh_token,
            expires_in_refresh_token,
            expires_in_refresh_token_days,
        } = auth;

        if (!user) {
            throw new AppError('Username or password incorrect', 401);
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError('Username or password incorrect', 401);
        }

        const role = await this.rolesRepository.findById(user.id_role);

        const token = sign(
            {
                name: user.name,
                email: user.email,
                username: user.username,
                telefone: user.telefone,
                role: {
                    id: role.id,
                    name: role.name,
                    description: role.description,
                },
                id_account: user.id_account,
            },
            secret_token,
            {
                subject: user.id,
                expiresIn: expires_in_token,
            },
        );

        const refresh_token = sign(
            {
                name: user.name,
                email: user.email,
                username: user.username,
                telefone: user.telefone,
                role: {
                    id: role.id,
                    name: role.name,
                    description: role.description,
                },
                id_account: user.id_account,
            },
            secret_refresh_token,
            {
                subject: user.id,
                expiresIn: expires_in_refresh_token,
            },
        );

        const refresh_token_expires_date = this.dayjsDateProvider.addDays(
            expires_in_refresh_token_days,
        );

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date,
        });

        return {
            token,
            user: {
                name: user.name,
                email: user.email,
                username: user.username,
                telefone: user.telefone,
                role: {
                    id: role.id,
                    name: role.name,
                    description: role.description,
                },
                id_account: user.id_account,
            },
            refresh_token,
        };
    }
}

export { AuthenticateUserUseCase };
