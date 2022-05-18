import { Product } from '@prisma/client';

interface IProductsRepository {
    create(data: ICreateProductDTO): Promise<Product>;
}

export { IProductsRepository };
