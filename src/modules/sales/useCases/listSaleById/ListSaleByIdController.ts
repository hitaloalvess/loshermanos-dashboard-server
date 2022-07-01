import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSaleByIdUseCase } from './ListSaleByIdUseCase';

class ListSaleByIdController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listSaleByIdUseCase = container.resolve(ListSaleByIdUseCase);

        const { id_sale } = req.params;

        const sale = await listSaleByIdUseCase.execute(id_sale);

        return res.json(sale);
    }
}

export { ListSaleByIdController };
