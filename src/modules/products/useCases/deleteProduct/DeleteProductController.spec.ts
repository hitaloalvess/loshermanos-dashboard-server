import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let token: string;
let product: Product;
describe('Delete product', () => {
    beforeAll(async () => {
        const account = await prismaClient.account.create({
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

        product = await prismaClient.product.create({
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

    it('should be able to delete product', async () => {
        const responseDeleteProduct = await request(app)
            .delete(`/products/${product.id}`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseDeleteProduct.status).toBe(200);
        expect(responseDeleteProduct.error).toBeFalsy();
    });

    it('should not be able to delete a non-existent product', async () => {
        const responseDeleteProduct = await request(app)
            .delete(`/products/incorrectID`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseDeleteProduct.status).toBe(400);
        expect(responseDeleteProduct.error).toBeTruthy();
    });
});
