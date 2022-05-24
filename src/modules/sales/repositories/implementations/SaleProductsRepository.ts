import { PrismaClient, SaleProduct } from '@prisma/client';

import { prismaClient } from '../../../../database/prismaClient';
import { ISaleProductsRepository } from '../ISaleProductsRepository';

class SaleProductsRepository implements ISaleProductsRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaClient;
    }
    async create(id_sale: string, id_product: string): Promise<SaleProduct> {
        const saleProduct = await this.repository.saleProduct.create({
            data: {
                id_sale,
                id_product,
            },
        });

        return saleProduct;
    }
}

export { SaleProductsRepository };
