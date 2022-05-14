import { Account } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';

interface IRequest {
    name_stablishment: string;
}

@injectable()
class CreateAccountUseCase {
    constructor(
        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,
    ) {}

    async execute({ name_stablishment }: IRequest): Promise<Account> {
        const accountExists = await this.accountsRepository.findByName(
            name_stablishment,
        );

        if (accountExists) {
            throw new AppError(
                'Account with that business name already exists',
            );
        }

        const account = await this.accountsRepository.create({
            name_stablishment,
        });

        return account;
    }
}

export { CreateAccountUseCase };
