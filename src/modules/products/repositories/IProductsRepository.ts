import { Product } from '@prisma/client';

import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { IUpdateProductDTO } from '../dtos/IUpdateProductDTO';

interface IProductsRepository {
    create(data: ICreateProductDTO): Promise<Product>;
    update(data: IUpdateProductDTO): Promise<Product>;
    deleteById(id_product: string): Promise<Product>;
    findByDescription(description: string): Promise<Product | undefined | null>;
    findById(id: string): Promise<Product | undefined | null>;
    findAll(id_account: string): Promise<Product[]>;
}

export { IProductsRepository };
