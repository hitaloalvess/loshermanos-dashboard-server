import { inject, injectable } from 'tsyringe';

import { EnvironmentType } from '../../../../@types';
import { Product, SaleWithProducts } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { getUrlProduct } from '../../../../util/handleUrl';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { IProductsSaleRepository } from '../../repositories/ISaleProductsRepository';
import { ISalesRepository } from '../../repositories/ISalesRepository';

@injectable()
class ListAllSalesUseCase {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,

        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,

        @inject('SaleProductsRepository')
        private saleProductsRepository: IProductsSaleRepository,
    ) {}
    async execute(id_account: string): Promise<SaleWithProducts[]> {
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
                        amount: item.amount || 0,
                        price: item.product_value,
                        url: getUrlProduct(
                            process.env.DISK as EnvironmentType,
                            item.product?.image_name as string,
                        ),
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
