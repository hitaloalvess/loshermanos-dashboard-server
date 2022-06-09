import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRoleUseCase } from './CreateRoleUseCase';

class CreateRoleController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createRoleUseCase = container.resolve(CreateRoleUseCase);

        const { name, description, id_account } = req.body;

        const role = await createRoleUseCase.execute({
            name,
            description,
            id_account,
        });

        return res.status(201).json(role);
    }
}

export { CreateRoleController };
