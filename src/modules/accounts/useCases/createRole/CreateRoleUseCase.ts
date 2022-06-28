import { inject, injectable } from 'tsyringe';

import { Role } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { IRolesRepository } from '../../repositories/IRolesRepository';

interface IRequest {
    name: string;
    description: string;
    id_account: string;
}

@injectable()
class CreateRoleUseCase {
    constructor(
        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,

        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    async execute({ name, description, id_account }: IRequest): Promise<Role> {
        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Account does not exists');
        }

        const roleAlreadyExists = await this.rolesRepository.findByName(name);

        if (roleAlreadyExists) {
            throw new AppError('Role already exists');
        }

        const role = await this.rolesRepository.create({
            name,
            description,
            id_account,
        });
        return role;
    }
}

export { CreateRoleUseCase };
