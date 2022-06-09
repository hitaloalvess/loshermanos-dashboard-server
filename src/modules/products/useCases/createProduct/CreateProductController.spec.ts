import { Account } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let token: string;
let account: Account;
describe('Create a new product', () => {
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

    it('should be able to create a new product', async () => {
        const responseCreateProduct = await request(app)
            .post('/products')
            .send({
                description: 'Pizza de frango',
                price: new Decimal(35),
                image_name: 'logo.png',
                id_account: account.id,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseCreateProduct.status).toBe(201);
        expect(responseCreateProduct.error).toBeFalsy();
    });

    it('should not be able to create a new product for a non-existent account', async () => {
        const responseCreateProduct = await request(app)
            .post('/products')
            .send({
                description: 'Pizza de catupiry',
                price: new Decimal(35),
                image_name: 'logo.png',
                id_account: 'incorrectID',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseCreateProduct.status).toBe(400);
        expect(responseCreateProduct.error).toBeTruthy();
    });

    it('should not be able to create a new product with existing description', async () => {
        const responseCreateProduct = await request(app)
            .post('/products')
            .send({
                description: 'Pizza de frango',
                price: new Decimal(35),
                image_name: 'logo.png',
                id_account: account.id,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseCreateProduct.status).toBe(400);
        expect(responseCreateProduct.error).toBeTruthy();
    });
});
