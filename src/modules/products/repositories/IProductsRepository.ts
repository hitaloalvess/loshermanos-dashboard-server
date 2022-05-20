import { Product } from '@prisma/client';

import { ICreateProductDTO } from '../dtos/ICreateProductDTO';

interface IProductsRepository {
    create(data: ICreateProductDTO): Promise<Product>;
    findByDescription(description: string): Promise<Product | undefined | null>;
    findById(id: string): Promise<Product | undefined | null>;
}

export { IProductsRepository };
