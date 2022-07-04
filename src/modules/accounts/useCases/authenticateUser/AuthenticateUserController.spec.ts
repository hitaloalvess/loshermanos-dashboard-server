import request from 'supertest';

import { app } from '../../../../shared/infra/http/app';

const userData = {
    name: 'Hitalo',
    email: 'hitalo.ralves@hotmail.com',
    username: 'admin',
    password: '12345',
    telefone: '213213124',
};

describe('Authenticate user', () => {
    beforeAll(async () => {
        const accountCreated = await request(app)
            .post('/account')
            .send({
                ...userData,
                name_stablishment: 'LosHermanos - Teste',
            });
    });

    it('should be able to authenticate user', async () => {
        const responseAuthenticateUser = await request(app)
            .post('/session')
            .send({
                username: 'admin',
                password: '12345',
            });

        expect(responseAuthenticateUser.status).toBe(201);
    });

    it('should not be able to authenticate user with incorrect username', async () => {
        const responseAuthenticateUser = await request(app)
            .post('/session')
            .send({
                username: 'adminIncorrect',
                password: '12345',
            });

        expect(responseAuthenticateUser.status).toBe(401);
    });

    it('should not be able to authenticate user with incorrect password', async () => {
        const responseAuthenticateUser = await request(app)
            .post('/session')
            .send({
                username: 'admin',
                password: 'passwordIncorrect',
            });

        expect(responseAuthenticateUser.status).toBe(401);
    });
});
