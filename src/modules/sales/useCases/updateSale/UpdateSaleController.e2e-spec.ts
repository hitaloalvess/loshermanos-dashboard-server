import { Decimal } from '@prisma/client/runtime';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { Product, Sale } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let sale: Sale;
let token: string;
let product: Product;
let product1: Product;
describe('Update sale', () => {
    beforeAll(async () => {
        const account = await prismaClient.account.create({
            data: {
                name_stablishment: 'LosHermanos',
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
            },
        });

        const customer = await prismaClient.customer.create({
            data: {
                name: 'Test',
                cpf: '1234345435',
                road: 'Rua test',
                district: 'District test',
                number: '330',
                city: 'Test city',
                phone: '(17)2222222',
                zip_code: '11111-111',
                id_account: account.id,
            },
        });

        product = await prismaClient.product.create({
            data: {
                description: 'Teste',
                price: new Decimal(44),
                image_name: 'logo.png',
                id_account: account.id,
            },
        });

        product1 = await prismaClient.product.create({
            data: {
                description: 'Teste1',
                price: new Decimal(50),
                image_name: 'logo1.png',
                id_account: account.id,
            },
        });

        sale = await prismaClient.sale.create({
            data: {
                total: new Decimal(50),
                value_pay: new Decimal(40),
                descount: new Decimal(0),
                sale_type: 'PENDING',
                updated_at: new Date(),
                id_account: account.id,
                id_customer: customer.id,
            },
        });

        await prismaClient.saleProduct.create({
            data: {
                id_sale: sale.id as string,
                id_product: product.id as string,
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

    it('should be able to update sale', async () => {
        const responseUpdateSale = await request(app)
            .put(`/sales/${sale.id}`)
            .send({
                id_sale: sale.id,
                total: new Decimal(94),
                value_pay: new Decimal(50),
                descount: new Decimal(0),
                sale_type: 'PENDING',
                updated_at: new Date(),
                products: [product, product1],
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseUpdateSale.status).toBe(200);
        expect(responseUpdateSale.error).toBeFalsy();
    });

    it('should not be able to update a non-existent sale', async () => {
        const responseUpdateSale = await request(app)
            .put(`/sales/incorrectID`)
            .send({
                id_sale: sale.id,
                total: new Decimal(94),
                value_pay: new Decimal(50),
                descount: new Decimal(0),
                sale_type: 'PENDING',
                updated_at: new Date(),
                products: [product, product1],
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseUpdateSale.status).toBe(400);
        expect(responseUpdateSale.error).toBeTruthy();
    });
});
