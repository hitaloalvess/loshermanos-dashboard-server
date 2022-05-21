import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { IProductsRepository } from '../../repositories/IProductsRepository';

interface IRequest {
    description: string;
    price: Decimal;
    image_name: string;
    id_account: string;
}

@injectable()
class CreateProductUseCase {
    constructor(
        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,

        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    async execute({
        description,
        price,
        image_name,
        id_account,
    }: IRequest): Promise<Product> {
        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Account does not exists');
        }

        const productExists = await this.productsRepository.findByDescription(
            description,
        );

        if (productExists) {
            throw new AppError(
                'There is already a product with this description',
            );
        }

        const product = await this.productsRepository.create({
            price,
            description,
            image_name,
            id_account,
        });

        return product;
    }
}

export { CreateProductUseCase };
