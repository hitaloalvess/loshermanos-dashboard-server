import { PrismaClient, Product } from '@prisma/client';

import { prismaClient } from '../../../../database/prismaClient';
import { ICreateProductDTO } from '../../dtos/ICreateProductDTO';
import { IUpdateProductDTO } from '../../dtos/IUpdateProductDTO';
import { IProductsRepository } from '../IProductsRepository';

class ProductsRepository implements IProductsRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaClient;
    }

    async create({
        description,
        price,
        image_name,
        id_account,
    }: ICreateProductDTO): Promise<Product> {
        const product = await this.repository.product.create({
            data: {
                description,
                price,
                image_name,
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

    async findById(id: string): Promise<Product | null | undefined> {
        const product = await this.repository.product.findFirst({
            where: {
                id,
            },
        });

        return product;
    }

    async update({
        description,
        price,
        image_name,
        id_product,
    }: IUpdateProductDTO): Promise<Product> {
        const product = await this.repository.product.update({
            where: {
                id: id_product,
            },
            data: {
                description,
                price,
                image_name,
            },
        });

        return product;
    }

    async deleteById(id_product: string): Promise<Product> {
        const product = await this.repository.product.delete({
            where: {
                id: id_product,
            },
        });

        return product;
    }
}

export { ProductsRepository };
