import { PrismaClient, Product } from '@prisma/client';

import { prismaClient } from '../../../../database/prismaClient';
import { ICreateProductDTO } from '../../dtos/ICreateProductDTO';
import { IProductsRepository } from '../IProductsRepository';

class ProductsRepository implements IProductsRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaClient;
    }

    async create({
        description,
        price,
        id_account,
    }: ICreateProductDTO): Promise<Product> {
        const product = await this.repository.product.create({
            data: {
                description,
                price,
                id_account,
            },
        });

        return product;
    }

    async findByDescription(
        description: string,
    ): Promise<Product | null | undefined> {
        const product = await this.repository.product.findFirst({
            where: {
                description,
            },
        });

        return product;
    }
}

export { ProductsRepository };
