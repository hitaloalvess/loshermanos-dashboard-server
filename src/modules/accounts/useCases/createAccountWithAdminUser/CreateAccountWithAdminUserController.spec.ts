import request from 'supertest';

import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

describe('Create account with admin user', () => {
    beforeAll(async () => {
        const account = await prismaClient.account.create({
            data: {
                name_stablishment: 'Teste',
            },
        });
        await prismaClient.role.create({
            data: {
                name: 'admin',
                description: 'Administrador',
                id_account: account.id,
            },
        });
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should be able to create a new account with admin user', async () => {
        const responseCreateAccountWithAdminUser = await request(app)
            .post('/account')
            .send({
                name: 'Hitalo',
                email: 'hitalo.ralves@hotmail.com',
                username: 'hitalo123',
                password: '12345',
                telefone: '(17)99999-9999',
                name_stablishment: 'LosHermanos',
            });

        expect(responseCreateAccountWithAdminUser.status).toBe(201);
        expect(responseCreateAccountWithAdminUser.error).toBeFalsy();
    });
});
