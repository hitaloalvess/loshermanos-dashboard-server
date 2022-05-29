import { hash } from 'bcryptjs';
import { resolve } from 'path';
import request from 'supertest';

import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let token: string;
describe('Upload product image', () => {
    const imageFile = resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        '..',
        'tmp',
        'test.png',
    );

    beforeAll(async () => {
        await prismaClient.user.create({
            data: {
                name: 'Hitalo',
                email: 'hitalo.ralves@hotmail.com',
                username: 'admin123',
                password: await hash('11111', 8),
                telefone: '213213124',
                account: {
                    create: {
                        name_stablishment: 'LosHermanos',
                    },
                },
                role: {
                    create: {
                        name: 'admin',
                        description: 'Administrator',
                    },
                },
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

    it('should be able to upload product image', async () => {
        const responseUploadImage = await request(app)
            .post(`/products/image`)
            .attach('image', imageFile)
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(responseUploadImage.status).toBe(201);
        expect(responseUploadImage.error).toBeFalsy();
    });
});
