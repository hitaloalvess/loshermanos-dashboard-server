import { hash } from 'bcryptjs';
import request from 'supertest';

import { Customer } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let token: string;
let customer: Customer;

describe('Delete customer', () => {
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
                id_account: account.id,
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

    it('should be able to delete customer', async () => {
        const responseDeleteCustomer = await request(app)
            .delete(`/customers/${customer.id}`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseDeleteCustomer.status).toBe(200);
        expect(responseDeleteCustomer.error).toBeFalsy();
    });

    it('should not be able to delete a non-existent customer', async () => {
        const responseDeleteCustomer = await request(app)
            .delete(`/customers/incorrectID`)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseDeleteCustomer.status).toBe(400);
        expect(responseDeleteCustomer.error).toBeTruthy();
    });
});
