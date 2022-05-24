import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCustomerUseCase } from './DeleteCustomerUseCase';

class DeleteCustomerController {
    async handle(req: Request, res: Response): Promise<Response> {
        const deleteCustomerUseCase = container.resolve(DeleteCustomerUseCase);

        const { id_customer } = req.params;

        await deleteCustomerUseCase.execute(id_customer);

        return res.send();
    }
}

export { DeleteCustomerController };
