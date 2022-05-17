import { UserTokens } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    private usersTokens: UserTokens[] = [];

    create({
        refresh_token,
        user_id,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken: UserTokens = {
            id: uuid(),
            refresh_token,
            id_user: user_id,
            expires_date,
            created_at: new Date(),
        };

        this.usersTokens.push(userToken);

        return Promise.resolve(userToken);
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserTokens | null | undefined> {
        return Promise.resolve(
            this.usersTokens.find(
                userToken =>
                    userToken.id_user === user_id &&
                    userToken.refresh_token === refresh_token,
            ),
        );
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.usersTokens.find(
            userToken => userToken.id === id,
        ) as UserTokens;
        const index = this.usersTokens.indexOf(userToken);

        this.usersTokens.splice(index);
    }
}

export { UsersTokensRepositoryInMemory };
