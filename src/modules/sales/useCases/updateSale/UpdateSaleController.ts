import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateSaleUseCase } from './UpdateSaleUseCase';

class UpdateSaleController {
    async handle(req: Request, res: Response): Promise<Response> {
        const updateSaleUseCase = container.resolve(UpdateSaleUseCase);

        const { id_sale } = req.params;
        const { total, value_pay, descount, sale_type, updated_at, products } =
            req.body;

        const sale = await updateSaleUseCase.execute({
            total,
            value_pay,
            descount,
            sale_type,
            updated_at,
            products,
            id_sale,
        });

        return res.json(sale);
    }
}

export { UpdateSaleController };
