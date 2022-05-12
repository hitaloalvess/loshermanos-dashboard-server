import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { CreateRoleUseCase } from './CreateRoleUseCase';

class CreateRoleController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createRoleUseCase = container.resolve(CreateRoleUseCase);

        const { name, description } = req.body;

        const role = await createRoleUseCase.execute({ name, description });

        // if (role instanceof AppError) {
        //     return res.status(400).json(role.message);
        // }

        return res.status(201).json(role);
    }
}

export { CreateRoleController };
