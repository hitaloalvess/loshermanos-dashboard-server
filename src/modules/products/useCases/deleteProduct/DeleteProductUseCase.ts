import { inject, injectable } from 'tsyringe';

import { Product } from '../../../../database/entities';
import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IProductsRepository } from '../../repositories/IProductsRepository';

@injectable()
class DeleteProductUseCase {
    constructor(
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,

        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    async execute(id_product: string): Promise<Product> {
        const productExists = await this.productsRepository.findById(
            id_product,
        );

        if (!productExists) {
            throw new AppError('Product does not exists');
        }

        const product = await this.productsRepository.deleteById(id_product);

        await this.storageProvider.delete(product.image_name, 'products');

        return product;
    }
}

export { DeleteProductUseCase };
