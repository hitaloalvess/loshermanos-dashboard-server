import request from 'supertest';

import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

describe('Create permission', () => {
    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should be able to create a new permission', async () => {
        const responseCreatePermission = await request(app)
            .post('/permission')
            .send({
                name: 'create.product',
                description: 'Criar novo produto',
            });

        expect(responseCreatePermission.status).toBe(201);
        expect(responseCreatePermission.error).toBeFalsy();
    });

    it('should not be able to create a permission with an already existing name', async () => {
        const responseCreatePermission = await request(app)
            .post('/permission')
            .send({
                name: 'create.product',
                description: 'Criar novo produto',
            });

        expect(responseCreatePermission.status).toBe(400);
        expect(responseCreatePermission.error).toBeTruthy();
    });
});
