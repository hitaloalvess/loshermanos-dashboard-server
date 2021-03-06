import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface IPayload {
    sub: string;
    name: string;
    email: string;
    username: string;
    telefone: string;
    admin: boolean;
    id_account: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('DayjsDateProvider')
        private dayjsDateProvider: IDateProvider,
    ) {}

    async execute(token: string): Promise<ITokenResponse | null> {
        const {
            name,
            email,
            username,
            telefone,
            admin,
            id_account,
            sub: user_id,
        } = verify(token, auth.secret_refresh_token) as IPayload;
        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token,
            );

        if (!userToken) {
            throw new AppError('Refresh token does not exists!', 401);
        }

        await this.usersTokensRepository.deleteById(userToken.id as string);

        const newRefreshToken = sign(
            {
                name,
                email,
                username,
                telefone,
                admin,
                id_account,
            },
            auth.secret_refresh_token,
            {
                subject: userToken.id_user,
                expiresIn: auth.expires_in_refresh_token,
            },
        );

        const expires_date = this.dayjsDateProvider.addDays(
            auth.expires_in_refresh_token_days,
        );

        await this.usersTokensRepository.create({
            user_id,
            refresh_token: newRefreshToken,
            expires_date,
        });

        const newToken = sign(
            {
                name,
                email,
                username,
                telefone,
                admin,
                id_account,
            },
            auth.secret_token,
            {
                subject: user_id,
                expiresIn: auth.expires_in_token,
            },
        );

        return {
            token: newToken,
            refresh_token: newRefreshToken,
        };
    }
}

export { RefreshTokenUseCase };
