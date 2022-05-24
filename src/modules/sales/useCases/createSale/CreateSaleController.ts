import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSaleUseCase } from './CreateSaleUseCase';

class CreateSaleController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createSaleUseCase = container.resolve(CreateSaleUseCase);

        const {
            total,
            value_pay,
            descount,
            sale_type,
            updated_at,
            id_account,
            id_customer,
        } = req.body;

        const sale = await createSaleUseCase.execute({
            total,
            value_pay,
            descount,
            sale_type,
            updated_at,
            id_account,
            id_customer,
        });

        return res.status(201).json(sale);
    }
}

export { CreateSaleController };
