import { hash } from 'bcryptjs';
import request from 'supertest';

import { Account, Role } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let role: Role;
let account: Account;
let token: string;
describe('Create a new user', () => {
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

        const responseCreateToken = await request(app).post('/session').send({
            username: 'admin123',
            password: '11111',
        });

        token = responseCreateToken.body.token;
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should be able to create a new user', async () => {
        const responseCreateUser = await request(app)
            .post('/users')
            .send({
                name: 'Hitalo',
                email: 'hitalo.ralves@hotmail.com',
                username: 'hitalo123',
                password: '12345',
                telefone: '213213124',
                id_account: account.id,
                id_role: role.id,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseCreateUser.status).toBe(201);
        expect(responseCreateUser.error).toBeFalsy();
    });

    it('should not be able to create a new user with username existent', async () => {
        const responseCreateUser = await request(app)
            .post('/users')
            .send({
                name: 'Hitalo Alves',
                email: 'hitalo.ralves@outlook.com',
                username: 'hitalo123',
                password: '12345',
                telefone: '213213124',
                id_account: account.id,
                id_role: role.id,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseCreateUser.status).toBe(400);
        expect(responseCreateUser.error).toBeTruthy();
    });

    it('should not be able to create a new user with account non-existent', async () => {
        const responseCreateUser = await request(app)
            .post('/users')
            .send({
                name: 'Hitalo Alves',
                email: 'hitalo.ralves@outlook.com',
                username: 'hitalo123',
                password: '12345',
                telefone: '213213124',
                id_account: 'incorrectID',
                id_role: role.id,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseCreateUser.status).toBe(400);
        expect(responseCreateUser.error).toBeTruthy();
    });

    it('should not be able to create a new user with role non-existent', async () => {
        const responseCreateUser = await request(app)
            .post('/users')
            .send({
                name: 'Hitalo Alves',
                email: 'hitalo.ralves@outlook.com',
                username: 'hitalo123',
                password: '12345',
                telefone: '213213124',
                id_account: account.id,
                id_role: 'incorrectID',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseCreateUser.status).toBe(400);
        expect(responseCreateUser.error).toBeTruthy();
    });
});
