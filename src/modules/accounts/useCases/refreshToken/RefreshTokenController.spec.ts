import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import request from 'supertest';

import auth from '../../../../config/auth';
import { Account } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let token: string;
let refresh_token: string;
let account: Account;

describe('Refresh user token', () => {
    beforeAll(async () => {
        account = await prismaClient.account.create({
            data: {
                name_stablishment: 'Teste',
            },
        });

        await prismaClient.user.create({
            data: {
                name: 'Hitalo',
                email: 'hitalo.ralves@hotmail.com',
                username: 'admin123',
                password: await hash('11111', 8),
                telefone: '213213124',
                account: {
                    connect: {
                        id: account.id,
                    },
                },
                role: {
                    create: {
                        name: 'admin',
                        description: 'Administrator',
                        id_account: account.id as string,
                    },
                },
            },
        });

        const responseCreateToken = await request(app).post('/session').send({
            username: 'admin123',
            password: '11111',
        });

        token = responseCreateToken.body.token;
        refresh_token = responseCreateToken.body.refresh_token;
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should be able to refresh user token', async () => {
        const responseRefreshToken = await request(app)
            .post('/refresh_token')
            .send({
                token: refresh_token,
            });

        expect(responseRefreshToken.status).toBe(200);
        expect(responseRefreshToken.error).toBeFalsy();
    });

    it('should not be able to refresh an invalid user token', async () => {
        const invalidToken = sign(
            {
                username: 'teste123',
                email: 'teste@teste',
            },
            auth.secret_refresh_token,
            {
                subject: 'asdqw214easd',
                expiresIn: auth.expires_in_refresh_token,
            },
        );

        const responseRefreshToken = await request(app)
            .post('/refresh_token')
            .send({
                token: invalidToken,
            });

        expect(responseRefreshToken.status).toBe(400);
        expect(responseRefreshToken.error).toBeTruthy();
    });
});
