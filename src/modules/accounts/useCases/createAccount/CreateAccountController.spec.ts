import request from 'supertest';

import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

describe('Create account', () => {
    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should be able to create a new account', async () => {
        const responseCreateAccount = await request(app).post('/account').send({
            name_stablishment: 'Los Hermanos',
        });

        expect(responseCreateAccount.status).toBe(201);
    });

    it('should be able to create a new account with name stablishment existent', async () => {
        const responseCreateAccount = await request(app).post('/account').send({
            name_stablishment: 'Los Hermanos',
        });

        expect(responseCreateAccount.status).toBe(400);
    });
});
