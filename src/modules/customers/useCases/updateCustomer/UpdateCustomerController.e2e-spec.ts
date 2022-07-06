import { hash } from 'bcryptjs';
import request from 'supertest';

import { Account, Customer } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let token: string;
let account: Account;
let customer: Customer;
describe('Update customer', () => {
    beforeAll(async () => {
        account = await prismaClient.account.create({
            data: {
                name_stablishment: 'LosHermanos',
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

    it('should be able to update customer', async () => {
        const responseUpdateCustomer = await request(app)
            .put(`/customers/${customer.id}`)
            .send({
                name: 'Hitalo Alves',
                cpf: '419.560.068-50',
                road: 'José Fernandes de Souza',
                district: 'CDHU',
                number: '360',
                city: 'Pontes Gestal',
                phone: '(17)99679-0426',
                zip_code: '15560-000',
                id_customer: customer.id,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseUpdateCustomer.status).toBe(200);
        expect(responseUpdateCustomer.error).toBeFalsy();
    });

    it('should not be able to update a non-existent customer', async () => {
        const responseUpdateCustomer = await request(app)
            .put(`/customers/incorrectID`)
            .send({
                name: 'Hitalo Rodrigo Alves',
                cpf: '419.500.234-21',
                road: 'José Fernandes',
                district: 'CDHU',
                number: '360',
                city: 'Pontes Gestal',
                phone: '(17)99679-0426',
                zip_code: '15560-000',
                id_customer: customer.id,
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseUpdateCustomer.status).toBe(400);
        expect(responseUpdateCustomer.error).toBeTruthy();
    });
});
