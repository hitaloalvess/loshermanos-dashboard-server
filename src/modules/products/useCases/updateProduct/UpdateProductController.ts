import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProductUseCase } from './UpdateProductUseCase';

class UpdateProductController {
    async handle(req: Request, res: Response): Promise<Response> {
        const updateProductUseCase = container.resolve(UpdateProductUseCase);

        const { id_product } = req.params;
        const { description, price, image_name } = req.body;

        const product = await updateProductUseCase.execute({
            description,
            price,
            image_name,
            id_product,
        });

        return res.json(product);
    }
}

export { UpdateProductController };
