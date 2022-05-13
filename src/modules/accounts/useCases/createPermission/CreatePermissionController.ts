import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePermissionUseCase } from './CreatePermissionUseCase';

class CreatePermissionController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createPermissionUseCase = container.resolve(
            CreatePermissionUseCase,
        );

        const { name, description } = req.body;

        const permission = await createPermissionUseCase.execute({
            name,
            description,
        });

        return res.status(201).json(permission);
    }
}

export { CreatePermissionController };
