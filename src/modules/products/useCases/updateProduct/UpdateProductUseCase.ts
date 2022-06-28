import { Decimal } from '@prisma/client/runtime';
import { inject, injectable } from 'tsyringe';

import { Product } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IProductsRepository } from '../../repositories/IProductsRepository';

interface IRequest {
    description: string;
    price: Decimal;
    image_name: string;
    id_product: string;
}

@injectable()
class UpdateProductUseCase {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    async execute({
        description,
        price,
        image_name,
        id_product,
    }: IRequest): Promise<Product> {
        const productsExists = await this.productsRepository.findById(
            id_product,
        );

        if (!productsExists) {
            throw new AppError('Product does not exists');
        }

        const product = await this.productsRepository.update({
            description,
            price,
            image_name,
            id_product,
        });

        return product;
    }
}

export { UpdateProductUseCase };
