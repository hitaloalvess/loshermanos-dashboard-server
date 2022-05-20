import { ProductImage } from '@prisma/client';

interface IProductsImageRepository {
    create(id_product: string, image_name: string): Promise<ProductImage>;
    findByProductId(id_product: string): Promise<ProductImage>;
}

export { IProductsImageRepository };
