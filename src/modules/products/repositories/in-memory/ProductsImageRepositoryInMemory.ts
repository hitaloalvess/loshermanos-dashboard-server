import { ProductImage } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { IProductsImageRepository } from '../IProductsImageRepository';

class ProductsImageRepositoryInMemory implements IProductsImageRepository {
    private productsImage: ProductImage[] = [];

    async create(
        id_product: string,
        image_name: string,
    ): Promise<ProductImage> {
        const productImage: ProductImage = {
            id: uuid(),
            image_name,
            id_product,
            created_at: new Date(),
        };

        this.productsImage.push(productImage);

        return Promise.resolve(productImage);
    }

    async findByProductId(id_product: string): Promise<ProductImage> {
        const productImage = this.productsImage.find(
            productImage => productImage.id_product === id_product,
        ) as ProductImage;

        return Promise.resolve(productImage);
    }
}

export { ProductsImageRepositoryInMemory };
