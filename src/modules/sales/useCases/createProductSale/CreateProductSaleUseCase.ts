import { inject } from 'tsyringe';

import { ProductSale } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IProductsRepository } from '../../../products/repositories/IProductsRepository';
import { IProductsSaleRepository } from '../../repositories/ISaleProductsRepository';
import { ISalesRepository } from '../../repositories/ISalesRepository';

interface IRequest {
    id_sale: string;
    id_product: string;
    amount: number;
}
class CreateProductSaleUseCase {
    constructor(
        @inject('SaleProductsRepository')
        private saleProductsRepository: IProductsSaleRepository,

        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,

        @inject('SalesRepository')
        private salesRepository: ISalesRepository,
    ) {}
    async execute({
        id_product,
        id_sale,
        amount,
    }: IRequest): Promise<ProductSale> {
        const productsExists = await this.productsRepository.findById(
            id_product,
        );

        if (!productsExists) {
            throw new AppError('Product does not exists');
        }

        const saleExists = await this.salesRepository.findById(id_sale);

        if (!saleExists) {
            throw new AppError('Sale does not exists');
        }

        const productSale = await this.saleProductsRepository.create({
            id_sale,
            id_product,
            amount,
        });

        return productSale;
    }
}

export { CreateProductSaleUseCase };
