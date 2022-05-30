import request from 'supertest';

import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

describe('Create role', () => {
    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should be able to create a new role', async () => {
        const responseCreateRole = await request(app).post('/role').send({
            name: 'manager',
            description: 'Gerente',
        });

        expect(responseCreateRole.status).toBe(201);
        expect(responseCreateRole.error).toBeFalsy();
    });

    it('should not be able to create a role with an already existing name', async () => {
        const responseCreateRole = await request(app).post('/role').send({
            name: 'manager',
            description: 'Gerente 2',
        });

        expect(responseCreateRole.status).toBe(400);
        expect(responseCreateRole.error).toBeTruthy();
    });
});