import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SalePaymentUseCase } from './SalePaymentUseCase';

class SalePaymentController {
    async handle(req: Request, res: Response): Promise<Response> {
        const salePaymentUseCase = container.resolve(SalePaymentUseCase);

        const { id_sale } = req.params;

        const { value_pay } = req.body;

        const updatedSale = await salePaymentUseCase.execute({
            id_sale,
            value_pay,
        });

        return res.json(updatedSale);
    }
}

export { SalePaymentController };