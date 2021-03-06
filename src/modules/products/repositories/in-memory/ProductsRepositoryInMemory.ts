import { v4 as uuid } from 'uuid';

import { IFunFindAllParams } from '../../../../@types';
import { Product } from '../../../../database/entities';
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

    async deleteById(id_product: string): Promise<Product> {
        const product = this.products.find(
            product => product.id === id_product,
        ) as Product;
        const index = this.products.indexOf(product);

        this.products.splice(index, 1);

        return Promise.resolve(product);
    }

    async findByDescription(
        description: string,
        id_account: string,
    ): Promise<Product | null> {
        const product = this.products.find(
            product =>
                product.description === description &&
                product.id_account === id_account,
        );

        return Promise.resolve(product as Product);
    }

    async findById(id: string): Promise<Product | null | undefined> {
        const product = this.products.find(product => product.id === id);

        return Promise.resolve(product);
    }

    async findAll({
        id_account,
        limit,
        page,
    }: IFunFindAllParams): Promise<Product[]> {
        const products = this.products.filter(
            product => product.id_account === id_account,
        );

        return Promise.resolve(products);
    }
}

export { ProductsRepositoryInMemory };
