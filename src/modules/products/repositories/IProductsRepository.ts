import { Product } from '@prisma/client';

import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { IUpdateProductDTO } from '../dtos/IUpdateProductDTO';

interface IProductsRepository {
    create(data: ICreateProductDTO): Promise<Product>;
    findByDescription(description: string): Promise<Product | undefined | null>;
    findById(id: string): Promise<Product | undefined | null>;
    update(data: IUpdateProductDTO): Promise<Product>;
}

export { IProductsRepository };
