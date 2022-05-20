import { PrismaClient, ProductImage } from '@prisma/client';

import { prismaClient } from '../../../../database/prismaClient';
import { IProductsImageRepository } from '../IProductsImageRepository';

class ProductsImageRepository implements IProductsImageRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaClient;
    }

    async create(
        id_product: string,
        image_name: string,
    ): Promise<ProductImage> {
        const productImage = await this.repository.productImage.create({
            data: {
                image_name,
                id_product,
            },
        });

        return productImage;
    }

    async findByProductId(id_product: string): Promise<ProductImage> {
        const productImage = (await this.repository.productImage.findFirst({
            where: {
                id_product,
            },
        })) as ProductImage;

        return productImage;
    }
}

export { ProductsImageRepository };
