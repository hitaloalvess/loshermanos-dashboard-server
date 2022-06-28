import { hash } from 'bcryptjs';
import request from 'supertest';

import { Account } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let token: string;
let account: Account;

describe('List all customers', () => {
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

        const responseCreateToken = await request(app).post('/session').send({
            username: 'admin123',
            password: '11111',
        });

        token = responseCreateToken.body.token;
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should be able to list all customers', async () => {
        const responseListAllCustomers = await request(app)
            .get(`/customers/all/${account.id}`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseListAllCustomers.status).toBe(200);
        expect(responseListAllCustomers.error).toBeFalsy();
        expect(responseListAllCustomers.body.length).toBe(1);
    });

    it('should not be ablet to list users from a non-existent account', async () => {
        const responseListAllCustomers = await request(app)
            .get(`/customers/all/incorrectID`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseListAllCustomers.status).toBe(400);
        expect(responseListAllCustomers.error).toBeTruthy();
    });
});
