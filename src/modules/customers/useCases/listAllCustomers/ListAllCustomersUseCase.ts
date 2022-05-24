import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

@injectable()
class ListAllCustomersUseCase {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,

        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,
    ) {}

    async execute(id_account: string) {
        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Account does not exists');
        }

        const customers = await this.customersRepository.findAll(id_account);

        return customers;
    }
}

export { ListAllCustomersUseCase };
