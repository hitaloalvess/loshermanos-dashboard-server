import { inject, injectable } from 'tsyringe';

import { Product, SaleWithProducts } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IProductsSaleRepository } from '../../repositories/ISaleProductsRepository';
import { ISalesRepository } from '../../repositories/ISalesRepository';

@injectable()
class ListSaleByIdUseCase {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,

        @inject('SaleProductsRepository')
        private saleProductsRepository: IProductsSaleRepository,
    ) {}

    async execute(id: string): Promise<SaleWithProducts> {
        const saleExists = await this.salesRepository.findById(id);

        if (!saleExists) {
            throw new AppError('Sale does not exists');
        }

        const productsSale = await this.saleProductsRepository.findAll(id);

        const products = productsSale.map(item => {
            return {
                ...(item.product as Product),
                amount: item.amount,
                price: item.product_value,
            };
        });

        const sale: SaleWithProducts = {
            ...saleExists,
            products,
        };

        return sale;
    }
}

export { ListSaleByIdUseCase };
