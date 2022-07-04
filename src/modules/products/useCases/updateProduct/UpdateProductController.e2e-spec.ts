import { Decimal } from '@prisma/client/runtime';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { Account, Product } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let token: string;
let product: Product;
let account: Account;
describe('Update product', () => {
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
                id_role: role.id,
            },
        });

        product = await prismaClient.product.create({
            data: {
                description: 'Pizza de frango',
                price: new Decimal(35),
                image_name: 'logo.png',
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

    it('should be able to update product', async () => {
        const responseUpdateProduct = await request(app)
            .put(`/products/${product.id}`)
            .send({
                description: 'Pizza de frango com catupiry',
                price: new Decimal(40),
                image_name: 'logo1.png',
                id_account: account.id,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseUpdateProduct.status).toBe(200);
        expect(responseUpdateProduct.error).toBeFalsy();
    });

    it('should not be able to update a non-existent product', async () => {
        const responseUpdateProduct = await request(app)
            .put(`/products/incorrectID`)
            .send({
                description: 'Pizza de frango com catupiry',
                price: new Decimal(40),
                image_name: 'logo1.png',
                id_account: account.id,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseUpdateProduct.status).toBe(400);
        expect(responseUpdateProduct.error).toBeTruthy();
    });
});
