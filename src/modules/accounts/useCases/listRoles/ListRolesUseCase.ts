import { Role } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';
import { IRolesRepository } from '../../repositories/IRolesRepository';

interface IRequest {
    id_account: string;
}

@injectable()
class ListRolesUseCase {
    constructor(
        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,

        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    async execute({ id_account }: IRequest): Promise<Role[]> {
        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Account does not exists');
        }

        const roles = this.rolesRepository.findAll(id_account);

        return roles;
    }
}

export { ListRolesUseCase };
