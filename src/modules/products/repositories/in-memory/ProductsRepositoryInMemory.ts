import { Product } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ICreateProductDTO } from '../../dtos/ICreateProductDTO';
import { IUpdateProductDTO } from '../../dtos/IUpdateProductDTO';
import { IProductsRepository } from '../IProductsRepository';

class ProductsRepositoryInMemory implements IProductsRepository {
    private products: Product[] = [];

    async create({
        description,
        price,
        image_name,
        id_account,
    }: ICreateProductDTO): Promise<Product> {
        const product: Product = {
            id: uuid(),
            description,
            price,
            image_name,
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

    async findById(id: string): Promise<Product | null | undefined> {
        const product = this.products.find(product => product.id === id);

        return Promise.resolve(product);
    }

    async update({
        description,
        price,
        image_name,
        id_product,
    }: IUpdateProductDTO): Promise<Product> {
        const product = this.products.find(
            product => product.id === id_product,
        ) as Product;
        const index = this.products.indexOf(product);

        const newProduct: Product = {
            ...product,
            description,
            price,
            image_name,
        };

        this.products.splice(index, 1, newProduct);

        return Promise.resolve(newProduct);
    }
}

export { ProductsRepositoryInMemory };
