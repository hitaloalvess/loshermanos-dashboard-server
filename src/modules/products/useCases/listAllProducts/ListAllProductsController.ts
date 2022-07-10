import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { addUrlInProduct } from '../../../../util/handleUrl';
import { ListAllProductsUseCase } from './ListAllProductsUseCase';

class ListAllProductsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listAllProductsUseCase = container.resolve(
            ListAllProductsUseCase,
        );

        const { id_account } = req.params;

        const pagination = res.paginatedResults;

        if (pagination) {
            const listProducts = addUrlInProduct(pagination);

            return res.json(listProducts);
        }

        const products = await listAllProductsUseCase.execute(id_account);

        return res.json(products);
    }
}

export { ListAllProductsController };
