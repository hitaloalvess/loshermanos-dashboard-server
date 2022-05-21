import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteProductUseCase } from './DeleteProductUseCase';

class DeleteProductController {
    async handle(req: Request, res: Response): Promise<Response> {
        const deleteProductUseCase = container.resolve(DeleteProductUseCase);

        const { id_product } = req.params;

        await deleteProductUseCase.execute(id_product);

        return res.send();
    }
}

export { DeleteProductController };
