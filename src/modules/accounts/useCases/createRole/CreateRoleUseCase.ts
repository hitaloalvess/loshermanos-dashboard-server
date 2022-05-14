import { Role } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IRolesRepository } from '../../repositories/IRolesRepository';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateRoleUseCase {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    async execute({ name, description }: IRequest): Promise<Role> {
        const roleAlreadyExists = await this.rolesRepository.findByName(name);

        if (roleAlreadyExists) {
            throw new AppError('Role already exists');
        }

        const role = await this.rolesRepository.create({
            name,
            description,
        });
        return role;
    }
}

export { CreateRoleUseCase };
