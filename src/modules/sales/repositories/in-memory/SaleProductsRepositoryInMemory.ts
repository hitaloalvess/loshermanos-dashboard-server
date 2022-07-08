import { Decimal } from '@prisma/client/runtime';

import { ProductSale } from '../../../../database/entities';
import { ICreateSaleProductDTO } from '../../dtos/ICreateSaleProductDTO';
import { IProductsSaleRepository } from '../ISaleProductsRepository';

class SaleProductsRepositoryInMemory implements IProductsSaleRepository {
    private productSales: ProductSale[] = [];
    async create({
        id_product,
        id_sale,
        amount,
        product_value,
    }: ICreateSaleProductDTO): Promise<ProductSale> {
        const productSale: ProductSale = {
            id_sale,
            id_product,
            amount,
            product_value: new Decimal(product_value),
        };

        this.productSales.push(productSale);

        return productSale;
    }

    async deleteAllProductsSale(id_sale: string): Promise<void> {
        const newList = this.productSales.filter(
            productSale => productSale.id_sale !== id_sale,
        );

        this.productSales = newList;
    }

    async findAll(id_sale: string): Promise<ProductSale[]> {
        const all = this.productSales.filter(
            productSale => productSale.id_sale === id_sale,
        );

        return all;
    }
}

export { SaleProductsRepositoryInMemory };
