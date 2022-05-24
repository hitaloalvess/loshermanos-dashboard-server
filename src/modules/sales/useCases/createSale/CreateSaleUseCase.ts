import { Sale, Sale_type } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { ICustomersRepository } from '../../../customers/repositories/ICustomersRepository';
import { ISalesRepository } from '../../repositories/ISalesRepository';

interface IRequest {
    total: Decimal;
    value_pay: Decimal;
    descount: Decimal;
    sale_type: Sale_type;
    updated_at: Date;
    id_account: string;
    id_customer: string;
}

@injectable()
class CreateSaleUseCase {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,

        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,

        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}
    async execute({
        total,
        value_pay,
        descount,
        sale_type,
        updated_at,
        id_account,
        id_customer,
    }: IRequest): Promise<Sale> {
        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Account does not exists');
        }

        const customerExists = await this.customersRepository.findById(
            id_customer,
        );

        if (!customerExists) {
            throw new AppError('Customer does not exists');
        }

        const sale = await this.salesRepository.create({
            total,
            value_pay,
            descount,
            sale_type,
            updated_at,
            id_account,
            id_customer,
        });

        return sale;
    }
}

export { CreateSaleUseCase };
