import { Permission } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IPermissionsRepository } from '../../repositories/IPermissionsRepository';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreatePermissionUseCase {
    constructor(
        @inject('PermissionsRepository')
        private permissionsRepository: IPermissionsRepository,
    ) {}

    async execute({ name, description }: IRequest): Promise<Permission> {
        const permissionAlreadyExists =
            await this.permissionsRepository.findByName(name);

        if (permissionAlreadyExists) {
            throw new AppError('Permission already exists');
        }

        const permission = await this.permissionsRepository.create({
            name,
            description,
        });
        return permission;
    }
}

export { CreatePermissionUseCase };
