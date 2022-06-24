import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

import { ProductSale } from '../../../../database/entities/ProductSale';
import { prismaClient } from '../../../../database/prismaClient';
import { ICreateSaleProductDTO } from '../../dtos/ICreateSaleProductDTO';
import { ISaleProductsRepository } from '../ISaleProductsRepository';

class SaleProductsRepository implements ISaleProductsRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaClient;
    }

    async create({
        id_sale,
        id_product,
        amount,
    }: ICreateSaleProductDTO): Promise<ProductSale> {
        const saleProduct = await this.repository.saleProduct.create({
            data: {
                id_sale,
                id_product,
                amount,
            },
        });

        return saleProduct;
    }

    async deleteAllProductsSale(id_sale: string): Promise<void> {
        await this.repository.saleProduct.deleteMany({
            where: {
                id_sale,
            },
        });
    }

    async findAll(id_sale: string): Promise<ProductSale[]> {
        const all = await this.repository.saleProduct.findMany({
            where: {
                id_sale,
            },
            include: {
                product: true,
            },
        });

        return all;
    }
}

export { SaleProductsRepository };
