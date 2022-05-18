import { Product } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ICreateProductDTO } from '../../dtos/ICreateProductDTO';
import { IProductsRepository } from '../IProductsRepository';

class ProductsRepositoryInMemory implements IProductsRepository {
    private products: Product[] = [];

    async create({
        description,
        price,
        id_account,
    }: ICreateProductDTO): Promise<Product> {
        const product: Product = {
            id: uuid(),
            description,
            price,
            id_account,
            created_at: new Date(),
        };

        this.products.push(product);

        return product;
    }

    async findByDescription(
        description: string,
    ): Promise<Product | undefined | null> {
        const product = this.products.find(
            product => product.description === description,
        );

        return Promise.resolve(product);
    }
}

export { ProductsRepositoryInMemory };
