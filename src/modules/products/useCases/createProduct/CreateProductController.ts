import { Decimal } from '@prisma/client/runtime';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createProductUseCase = container.resolve(CreateProductUseCase);
        const { description, price, image_name, id_account } = req.body;

        const product = await createProductUseCase.execute({
            description,
            price: new Decimal(price),
            image_name,
            id_account,
        });

        return res.status(201).json(product);
    }
}
export { CreateProductController };
