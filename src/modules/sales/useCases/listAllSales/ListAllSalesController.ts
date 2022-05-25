import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllSalesUseCase } from './ListAllSalesUseCase';

class ListAllSalesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listAllSalesUseCase = container.resolve(ListAllSalesUseCase);

        const { id_account } = req.params;

        const sales = await listAllSalesUseCase.execute(id_account);

        return res.json(sales);
    }
}

export { ListAllSalesController };
