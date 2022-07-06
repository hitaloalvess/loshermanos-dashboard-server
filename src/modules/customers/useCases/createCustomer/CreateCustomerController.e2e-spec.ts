import { hash } from 'bcryptjs';
import request from 'supertest';

import { Account } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let token: string;
let account: Account;
describe('Create customer', () => {
    beforeAll(async () => {
        account = await prismaClient.account.create({
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

    it('should be able to create customer', async () => {
        const responseCreateCustomer = await request(app)
            .post('/customers')
            .send({
                name: 'Test',
                cpf: '1234345435',
                road: 'Rua test',
                district: 'District test',
                number: '330',
                city: 'Test city',
                phone: '(17)2222222',
                zip_code: '11111-111',
                id_account: account.id,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseCreateCustomer.status).toBe(201);
        expect(responseCreateCustomer.error).toBeFalsy();
    });

    it('should not be able to create a new customer with existing cpf', async () => {
        const responseCreateCustomer = await request(app)
            .post('/customers')
            .send({
                name: 'Test 1',
                cpf: '1234345435',
                road: 'Rua test 1',
                district: 'District test 1',
                number: '310',
                city: 'Test city 1',
                phone: '(17)2323242',
                zip_code: '11111-111',
                id_account: account.id,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseCreateCustomer.status).toBe(400);
        expect(responseCreateCustomer.error).toBeTruthy();
    });

    it('should not be able to create a new customer for non-existent account', async () => {
        const responseCreateCustomer = await request(app)
            .post('/customers')
            .send({
                name: 'Test 1',
                cpf: '2344523432',
                road: 'Rua test 1',
                district: 'District test 1',
                number: '310',
                city: 'Test city 1',
                phone: '(17)2323242',
                zip_code: '11111-111',
                id_account: 'incorrectID',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseCreateCustomer.status).toBe(400);
        expect(responseCreateCustomer.error).toBeTruthy();
    });
});
