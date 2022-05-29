import { Account, Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let token: string;
let product: Product;
let account: Account;
describe('List all products', () => {
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

        await prismaClient.product.create({
            data: {
                description: 'Pizza de frango',
                price: new Decimal(35),
                image_name: 'logo.png',
                id_account: account.id,
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

    it('should be able to list all products', async () => {
        const responseListAllProducts = await request(app)
            .get(`/products/${account.id}`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseListAllProducts.status).toBe(200);
        expect(responseListAllProducts.error).toBeFalsy();
        expect(responseListAllProducts.body.length).toEqual(1);
    });

    it('should not be able to list products from non-existent accounts', async () => {
        const responseListAllProducts = await request(app)
            .get(`/products/incorrectID`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseListAllProducts.status).toBe(400);
        expect(responseListAllProducts.error).toBeTruthy();
    });
});
