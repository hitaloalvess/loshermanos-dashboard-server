import { Request, response, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAccountUseCase } from './CreateAccountUseCase';

class CreateAccountController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createAccountUseCase = container.resolve(CreateAccountUseCase);

        const { name_stablishment } = req.body;

        const account = await createAccountUseCase.execute({
            name_stablishment,
        });

        return res.status(201).json(account);
    }
}

export { CreateAccountController };
