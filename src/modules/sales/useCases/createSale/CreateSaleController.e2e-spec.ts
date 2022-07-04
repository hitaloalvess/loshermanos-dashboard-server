import { Decimal } from '@prisma/client/runtime';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { Account, Customer, Product } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let account: Account;
let customer: Customer;
let token: string;
let product: Product;
describe('Create sale', () => {
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

        customer = await prismaClient.customer.create({
            data: {
                name: 'Test',
                cpf: '1234345435',
                road: 'Rua test',
                district: 'District test',
                number: '330',
                city: 'Test city',
                phone: '(17)2222222',
                zip_code: '11111-111',
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

        product = await prismaClient.product.create({
            data: {
                description: 'Teste',
                price: new Decimal(44),
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

    it('should be able to create a new sale', async () => {
        const responseCreateSale = await request(app)
            .post('/sales')
            .send({
                total: new Decimal(50),
                value_pay: new Decimal(50),
                descount: new Decimal(0),
                sale_type: 'PAID_OUT',
                updated_at: new Date(),
                id_account: account.id,
                id_customer: customer.id,
                products: [product],
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseCreateSale.status).toBe(201);
        expect(responseCreateSale.error).toBeFalsy();
    });

    it('should not be able to create a new sale for non-existent account', async () => {
        const responseCreateSale = await request(app)
            .post('/sales')
            .send({
                total: new Decimal(50),
                value_pay: new Decimal(50),
                descount: new Decimal(0),
                sale_type: 'PAID_OUT',
                updated_at: new Date(),
                id_account: 'incorrectID',
                id_customer: customer.id,
                products: [product],
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseCreateSale.status).toBe(400);
        expect(responseCreateSale.error).toBeTruthy();
    });

    it('should not be able to create a new sale for non-existent customer', async () => {
        const responseCreateSale = await request(app)
            .post('/sales')
            .send({
                total: new Decimal(50),
                value_pay: new Decimal(50),
                descount: new Decimal(0),
                sale_type: 'PAID_OUT',
                updated_at: new Date(),
                id_account: account.id,
                id_customer: 'incorrectID',
                products: [product],
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseCreateSale.status).toBe(400);
        expect(responseCreateSale.error).toBeTruthy();
    });
});
