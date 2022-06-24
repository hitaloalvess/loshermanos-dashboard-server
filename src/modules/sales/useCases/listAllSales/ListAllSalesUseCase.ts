import { Decimal } from '@prisma/client/runtime';
import { inject, injectable } from 'tsyringe';

import { Product, Sale, SaleWithProducts } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { ISaleProductsRepository } from '../../repositories/ISaleProductsRepository';
import { ISalesRepository } from '../../repositories/ISalesRepository';

@injectable()
class ListAllSalesUseCase {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,

        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,

        @inject('SaleProductsRepository')
        private saleProductsRepository: ISaleProductsRepository,
    ) {}
    async execute(id_account: string) {
        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Sale does not exists');
        }

        const allSales = await this.salesRepository.findAll(id_account);

        const sales = await Promise.all(
            allSales.map(async sale => {
                const productsSale = await this.saleProductsRepository.findAll(
                    sale.id as string,
                );

                const products = productsSale.map(item => {
                    return {
                        ...(item.product as Product),
                        amount: item.amount,
                    };
                });

                return {
                    ...sale,
                    products,
                };
            }),
        );

        return sales;
    }
}

export { ListAllSalesUseCase };
