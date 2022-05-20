import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IProductsImageRepository } from '../../repositories/IProductsImageRepository';
import { IProductsRepository } from '../../repositories/IProductsRepository';

interface IRequest {
    id_product: string;
    image_name: string;
}

@injectable()
class UploadProductImageUseCase {
    constructor(
        @inject('ProductsImageRepository')
        private productImageRepository: IProductsImageRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,

        @inject('ProductsRepository')
        private productRepository: IProductsRepository,
    ) {}
    async execute({ id_product, image_name }: IRequest): Promise<void> {
        const productExists = await this.productRepository.findById(id_product);

        if (!productExists) {
            throw new AppError('Product does not exists');
        }

        const productContainsImage =
            await this.productImageRepository.findByProductId(id_product);

        if (productContainsImage) {
            await this.storageProvider.delete(image_name, '');
            throw new AppError('Product already contains image');
        }

        await this.storageProvider.save(image_name, 'products');
        await this.productImageRepository.create(id_product, image_name);
    }
}

export { UploadProductImageUseCase };
