import { hash } from 'bcryptjs';
import request from 'supertest';

import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

describe('Authenticate user', () => {
    beforeAll(async () => {
        const account = await prismaClient.account.create({
            data: {
                name_stablishment: 'LosHermanos - Test',
            },
        });

        await prismaClient.user.create({
            data: {
                name: 'Hitalo',
                email: 'hitalo.ralves@hotmail.com',
                username: 'admin',
                password: await hash('12345', 8),
                telefone: '213213124',
                account: {
                    connect: {
                        id: account.id,
                    },
                },
                role: {
                    create: {
                        name: 'admin',
                        description: 'Administrador',
                        id_account: account.id,
                    },
                },
            },
        });
    });

    afterAll(async () => {
        await prismaClient.user.deleteMany();
        await prismaClient.account.deleteMany();
    });

    it('should be able to authenticate user', async () => {
        const responseAuthenticateUser = await request(app)
            .post('/session')
            .send({
                username: 'admin',
                password: '12345',
            });

        expect(responseAuthenticateUser.status).toBe(201);
    });

    it('should not be able to authenticate user with incorrect username', async () => {
        const responseAuthenticateUser = await request(app)
            .post('/session')
            .send({
                username: 'adminIncorrect',
                password: '12345',
            });

        expect(responseAuthenticateUser.status).toBe(401);
    });

    it('should not be able to authenticate user with incorrect password', async () => {
        const responseAuthenticateUser = await request(app)
            .post('/session')
            .send({
                username: 'admin',
                password: 'passwordIncorrect',
            });

        expect(responseAuthenticateUser.status).toBe(401);
    });
});
