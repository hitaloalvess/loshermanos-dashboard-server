import request from 'supertest';

import { app } from '../../../../shared/infra/http/app';

const accountData = {
    name_stablishment: 'LosHermanos - Teste',
};

const roleData = {
    name: 'admin',
    description: 'Administrador',
};

describe('Create account with admin user', () => {
    beforeAll(async () => {
        const {
            body: { id: id_account },
        } = await request(app).post('/account').send(accountData);

        const roleCreated = await request(app)
            .post('/role')
            .send({
                ...roleData,
                id_account,
            });
    });

    it('should be able to create a new account with admin user', async () => {
        const responseCreateAccountWithAdminUser = await request(app)
            .post('/account')
            .send({
                name: 'Hitalo',
                email: 'hitalo.ralves@hotmail.com',
                username: 'hitalo123',
                password: '12345',
                telefone: '(17)99999-9999',
                name_stablishment: 'LosHermanos',
            });

        expect(responseCreateAccountWithAdminUser.status).toBe(201);
        expect(responseCreateAccountWithAdminUser.error).toBeFalsy();
    });
});
