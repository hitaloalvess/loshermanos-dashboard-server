import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCustomerUseCase } from './UpdateCustomerUseCase';

class UpdateCustomerController {
    async handle(req: Request, res: Response): Promise<Response> {
        const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase);

        const { id_customer } = req.params;

        const { name, cpf, road, district, number, city, phone, zip_code } =
            req.body;

        const customer = await updateCustomerUseCase.execute({
            name,
            cpf,
            road,
            district,
            number,
            city,
            phone,
            zip_code,
            id_customer,
        });

        return res.json(customer);
    }
}

export { UpdateCustomerController };
