import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface IPayload {
    sub: string;
    email: string;
    username: string;
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
            email,
            username,
            sub: user_id,
        } = verify(token, auth.secret_refresh_token) as IPayload;

        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token,
            );

        if (!userToken) {
            throw new AppError('Refresh token does not exists!');
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const newRefreshToken = sign(
            {
                username,
                email,
            },
            auth.secret_refresh_token,
            {
                subject: userToken.id,
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

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token,
        });

        return {
            token: newToken,
            refresh_token: newRefreshToken,
        };
    }
}

export { RefreshTokenUseCase };
