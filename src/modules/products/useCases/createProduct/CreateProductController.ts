import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createProductUseCase = container.resolve(CreateProductUseCase);

        const { id_account } = req.params;

        const { description, price, image_name } = req.body;

        const product = await createProductUseCase.execute({
            description,
            price,
            image_name,
            id_account,
        });

        return res.json(product);
    }
}
export { CreateProductController };
