import { Permission, Role } from '@prisma/client';
import request from 'supertest';

import { prismaClient } from '../../../../database/prismaClient';
import { app } from '../../../../shared/infra/http/app';

let role: Role;
let permission: Permission;
describe('Create relationship between permission and role', () => {
    beforeAll(async () => {
        role = await prismaClient.role.create({
            data: {
                name: 'admin',
                description: 'Administrator',
            },
        });

        permission = await prismaClient.permission.create({
            data: {
                name: 'create.customer',
                description: 'Create new customer',
            },
        });
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should be able to create a relationship between permission and role', async () => {
        const responsePermissionRole = await request(app)
            .post('/permissionRole')
            .send({
                id_permission: permission.id,
                id_role: role.id,
            });

        expect(responsePermissionRole.status).toBe(201);
        expect(responsePermissionRole.error).toBeFalsy();
    });

    it('should not be able to create a relationship between permission and a non-existent role', async () => {
        const responsePermissionRole = await request(app)
            .post('/permissionRole')
            .send({
                id_permission: permission.id,
                id_role: 'incorrectID',
            });

        expect(responsePermissionRole.status).toBe(400);
        expect(responsePermissionRole.error).toBeTruthy();
    });

    it('should not be able to create a relationship between role and a non-existent permission', async () => {
        const responsePermissionRole = await request(app)
            .post('/permissionRole')
            .send({
                id_permission: 'incorrectID',
                id_role: role.id,
            });

        expect(responsePermissionRole.status).toBe(400);
        expect(responsePermissionRole.error).toBeTruthy();
    });
});
