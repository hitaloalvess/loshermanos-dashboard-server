import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IProductsRepository } from '../../repositories/IProductsRepository';

interface IRequest {
    description: string;
    price: Decimal;
    url_image: string;
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
        url_image,
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
            url_image,
            id_product,
        });

        return product;
    }
}

export { UpdateProductUseCase };
