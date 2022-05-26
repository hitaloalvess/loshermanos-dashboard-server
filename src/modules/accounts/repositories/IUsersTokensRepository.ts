import { UserTokens } from '@prisma/client';

import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';

interface IUsersTokensRepository {
    create({
        refresh_token,
        user_id,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens>;

    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserTokens>;

    deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
