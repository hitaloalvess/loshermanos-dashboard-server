import { SaleProduct } from '@prisma/client';
import { inject } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IProductsRepository } from '../../../products/repositories/IProductsRepository';
import { ISaleProductsRepository } from '../../repositories/ISaleProductsRepository';
import { ISalesRepository } from '../../repositories/ISalesRepository';

interface IRequest {
    id_sale: string;
    id_product: string;
}
class CreateSaleProductUseCase {
    constructor(
        @inject('SaleProductsRepository')
        private saleProductsRepository: ISaleProductsRepository,

        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,

        @inject('SalesRepository')
        private salesRepository: ISalesRepository,
    ) {}
    async execute({ id_product, id_sale }: IRequest): Promise<SaleProduct> {
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

        const saleProduct = await this.saleProductsRepository.create(
            id_sale,
            id_product,
        );

        return saleProduct;
    }
}

export { CreateSaleProductUseCase };
