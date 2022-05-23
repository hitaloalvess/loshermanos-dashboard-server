import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCustomerUseCase } from './CreateCustomerUseCase';

class CreateCustomerController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

        const {
            name,
            cpf,
            road,
            district,
            number,
            city,
            phone,
            zip_code,
            id_account,
        } = req.body;

        const customer = await createCustomerUseCase.execute({
            name,
            cpf,
            road,
            district,
            number,
            city,
            phone,
            zip_code,
            id_account,
        });

        return res.status(201).json(customer);
    }
}

export { CreateCustomerController };
