import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteSaleUseCase } from './DeleteSaleUseCase';

class DeleteSaleController {
    async handle(req: Request, res: Response): Promise<Response> {
        const deleteSaleUseCase = container.resolve(DeleteSaleUseCase);

        const { id_sale } = req.params;

        await deleteSaleUseCase.execute(id_sale);

        return res.send();
    }
}

export { DeleteSaleController };
