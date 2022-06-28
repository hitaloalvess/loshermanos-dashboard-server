import { hash } from 'bcryptjs';
import request from 'supertest';

import { Account, Role, User } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let user: User;
let token: string;
let role: Role;
let account: Account;
describe('Update user', () => {
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
                id_account: account.id as string,
            },
        });

        await prismaClient.user.create({
            data: {
                name: 'Hitalo',
                email: 'hitalo.ralves@hotmail.com',
                username: 'admin123',
                password: await hash('11111', 8),
                telefone: '213213124',
                id_account: account.id as string,
                id_role: role.id as string,
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
                id_role: role.id as string,
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

    it('should be able to update user', async () => {
        const responseUpdateUser = await request(app)
            .put(`/users/${user.id}`)
            .send({
                name: 'Teste',
                email: 'teste@teste.com',
                username: 'teste123',
                password: '12345',
                telefone: '11111',
                id_role: role.id,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseUpdateUser.status).toBe(200);
        expect(responseUpdateUser.error).toBeFalsy();
    });

    it('should not be able to update a non-existent user', async () => {
        const responseUpdateUser = await request(app)
            .put(`/users/incorrectID`)
            .send({
                name: 'Teste',
                email: 'teste@teste.com',
                username: 'teste123',
                password: '12345',
                telefone: '11111',
                id_role: role.id,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseUpdateUser.status).toBe(400);
        expect(responseUpdateUser.error).toBeTruthy();
    });
});
