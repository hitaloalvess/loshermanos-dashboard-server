import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllCustomersUseCase } from './ListAllCustomersUseCase';

class ListAllCustomersController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listAllCustomersUseCase = container.resolve(
            ListAllCustomersUseCase,
        );

        const { id_account } = req.params;

        const customers = await listAllCustomersUseCase.execute(id_account);

        return res.json(customers);
    }
}

export { ListAllCustomersController };
