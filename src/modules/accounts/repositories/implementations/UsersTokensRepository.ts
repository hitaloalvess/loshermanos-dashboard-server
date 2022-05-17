import { PrismaClient, UserTokens } from '@prisma/client';

import { prismaClient } from '../../../../database/prismaClient';
import { ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaClient;
    }

    async create({
        refresh_token,
        user_id,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = await this.repository.userTokens.create({
            data: {
                refresh_token,
                id_user: user_id,
                expires_date,
            },
        });

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserTokens | undefined | null> {
        const userToken = await this.repository.userTokens.findFirst({
            where: {
                id_user: user_id,
                refresh_token,
            },
        });

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.userTokens.delete({
            where: {
                id,
            },
        });
    }
}

export { UsersTokensRepository };
