import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { ISalesRepository } from '../../repositories/ISalesRepository';

@injectable()
class ListAllSalesUseCase {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,

        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,
    ) {}
    async execute(id_account: string) {
        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Sale does not exists');
        }

        const sales = await this.salesRepository.findAll(id_account);

        return sales;
    }
}

export { ListAllSalesUseCase };
