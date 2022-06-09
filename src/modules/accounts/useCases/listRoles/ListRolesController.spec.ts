import { Account } from '@prisma/client';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let account: Account;
let token: string;
describe('List all roles', () => {
    beforeAll(async () => {
        account = await prismaClient.account.create({
            data: {
                name_stablishment: 'LosHermanos',
            },
        });

        const role = await prismaClient.role.create({
            data: {
                name: 'admin',
                description: 'Administrator',
                id_account: account.id,
            },
        });

        await prismaClient.user.create({
            data: {
                name: 'Hitalo',
                email: 'hitalo.ralves@hotmail.com',
                username: 'admin123',
                password: await hash('11111', 8),
                telefone: '213213124',
                id_account: account.id,
                id_role: role.id,
            },
        });

        const responseCreateToken = await request(app).post('/session').send({
            username: 'admin123',
            password: '11111',
        });

        token = responseCreateToken.body.token;
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should be able to list all roles', async () => {
        const responseListRoles = await request(app)
            .get(`/role/${account.id}`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseListRoles.status).toBe(200);
        expect(responseListRoles.error).toBeFalsy();
        expect(responseListRoles.body.length).toEqual(1);
    });

    it('should not be able to list roles from a non-existent account', async () => {
        const responseListRoles = await request(app)
            .get(`/role/incorrectID`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseListRoles.status).toBe(400);
        expect(responseListRoles.error).toBeTruthy();
    });
});
