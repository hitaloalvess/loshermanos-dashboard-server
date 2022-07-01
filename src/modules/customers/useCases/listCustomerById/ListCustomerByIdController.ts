import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCustomerByIdUseCase } from './ListCustomerByIdUseCase';

class ListCustomerByIdController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listCustomerByIdUseCase = container.resolve(
            ListCustomerByIdUseCase,
        );

        const { id_customer } = req.params;

        const customer = await listCustomerByIdUseCase.execute(id_customer);

        return res.json(customer);
    }
}

export { ListCustomerByIdController };
