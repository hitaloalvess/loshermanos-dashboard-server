import { Account, Role, User } from '@prisma/client';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let user: User;
let token: string;
let role: Role;
let account: Account;
describe('Delete user', () => {
    beforeAll(async () => {
        account = await prismaClient.account.create({
            data: {
                name_stablishment: 'LosHermanos',
            },
        });

        role = await prismaClient.role.create({
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

        user = await prismaClient.user.create({
            data: {
                name: 'Hitalo',
                email: 'hitalo.ralves@hotmail.com',
                username: 'hitalo123',
                password: await hash('22222', 8),
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

    it('should be able to delete user', async () => {
        const responseDeleteUser = await request(app)
            .delete(`/users/${user.id}`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseDeleteUser.status).toBe(200);
        expect(responseDeleteUser.error).toBeFalsy();
    });

    it('should not be able to delete a non-existent user', async () => {
        const responseDeleteUser = await request(app)
            .delete(`/users/IncorrectID`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseDeleteUser.status).toBe(400);
        expect(responseDeleteUser.error).toBeTruthy();
    });
});
