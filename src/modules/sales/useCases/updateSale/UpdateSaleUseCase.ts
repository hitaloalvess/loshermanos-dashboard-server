import { Decimal } from '@prisma/client/runtime';
import { inject, injectable } from 'tsyringe';

import { Product, SaleWithProducts } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IProductsSaleRepository } from '../../repositories/ISaleProductsRepository';
import { ISalesRepository } from '../../repositories/ISalesRepository';

interface IRequest {
    id_sale: string;
    total: Decimal;
    value_pay: Decimal;
    descount: Decimal;
    sale_type: 'PENDING' | 'PAID_OUT';
    updated_at: Date;
    products: Product[];
}

@injectable()
class UpdateSaleUseCase {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,

        @inject('SaleProductsRepository')
        private saleProductsRepository: IProductsSaleRepository,
    ) {}
    async execute({
        id_sale,
        total,
        value_pay,
        descount,
        sale_type,
        updated_at,
        products,
    }: IRequest): Promise<SaleWithProducts> {
        const saleExists = await this.salesRepository.findById(id_sale);

        if (!saleExists) {
            throw new AppError('Sale does not exists');
        }

        if (products.length <= 0) {
            throw new AppError(
                'It is not possible to update a sale and leave it without products',
            );
        }

        const updatedSale = await this.salesRepository.update({
            id_sale,
            total,
            value_pay,
            descount,
            sale_type,
            updated_at,
        });

        await this.saleProductsRepository.deleteAllProductsSale(id_sale);

        products.map(async product => {
            await this.saleProductsRepository.create({
                id_sale,
                id_product: product.id as string,
                amount: product.amount as number,
            });
        });

        const saleProducts: SaleWithProducts = {
            ...updatedSale,
            products,
        };

        return saleProducts;
    }
}

export { UpdateSaleUseCase };
