import { SaleProduct } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ISaleProductsRepository } from '../ISaleProductsRepository';

class SaleProductsRepositoryInMemory implements ISaleProductsRepository {
    private saleProducts: SaleProduct[] = [];
    async create(id_sale: string, id_product: string): Promise<SaleProduct> {
        const saleProduct: SaleProduct = {
            id: uuid(),
            id_sale,
            id_product,
        };

        this.saleProducts.push(saleProduct);

        return Promise.resolve(saleProduct);
    }
}

export { SaleProductsRepositoryInMemory };
