import { PermissionRole } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IPermissionsRepository } from '../../repositories/IPermissionsRepository';
import { IPermissionsRolesRepository } from '../../repositories/IPermissionsRolesRepository';
import { IRolesRepository } from '../../repositories/IRolesRepository';

interface IRequest {
    id_permission: string;
    id_role: string;
}

@injectable()
class CreatePermissionRoleUseCase {
    constructor(
        @inject('PermissionsRolesRepository')
        private permissionRoleRepository: IPermissionsRolesRepository,

        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,

        @inject('PermissionsRepository')
        private permissionsRepository: IPermissionsRepository,
    ) {}

    async execute({
        id_permission,
        id_role,
    }: IRequest): Promise<PermissionRole> {
        const role = await this.rolesRepository.findById(id_role);

        if (!role) {
            throw new AppError("Role don't not exists");
        }

        const permission = await this.permissionsRepository.findById(
            id_permission,
        );

        if (!permission) {
            throw new AppError("Permission don't not exists");
        }

        const permissionRole = await this.permissionRoleRepository.create({
            id_permission,
            id_role,
        });

        return permissionRole;
    }
}

export { CreatePermissionRoleUseCase };
