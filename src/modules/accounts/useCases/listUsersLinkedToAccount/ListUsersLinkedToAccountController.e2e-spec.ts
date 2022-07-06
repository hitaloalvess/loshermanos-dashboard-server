import { hash } from 'bcryptjs';
import request from 'supertest';

import { Account, User } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let user: User;
let userAdmin: User;
let token: string;
let account: Account;
describe('List users linked to account', () => {
    beforeAll(async () => {
        account = await prismaClient.account.create({
            data: {
                name_stablishment: 'LosHermanos',
            },
        });

        userAdmin = await prismaClient.user.create({
            data: {
                name: 'Hitalo',
                email: 'hitalo.ralves@hotmail.com',
                username: 'admin123',
                password: await hash('11111', 8),
                telefone: '213213124',
                admin: true,
                id_account: account.id as string,
            },
        });

        user = await prismaClient.user.create({
            data: {
                name: 'Hitalo',
                email: 'hitalo.ralves@hotmail.com',
                username: 'hitalo123',
                password: await hash('22222', 8),
                telefone: '213213124',
                id_account: account.id as string,
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

    it('should be able to list all users linked to account', async () => {
        const responseListUsers = await request(app)
            .get(`/users/${account.id}`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseListUsers.status).toBe(200);
        expect(responseListUsers.error).toBeFalsy();
        expect(responseListUsers.body.length).toEqual(2);
    });

    it('should not be able to list users from a non-existent account', async () => {
        const responseListUsers = await request(app)
            .get(`/users/incorrectID`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseListUsers.status).toBe(400);
        expect(responseListUsers.error).toBeTruthy();
    });
});
