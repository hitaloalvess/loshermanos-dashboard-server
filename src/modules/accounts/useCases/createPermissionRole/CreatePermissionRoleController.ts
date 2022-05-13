import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePermissionRoleUseCase } from './CreatePermissionRoleUseCase';

class CreatePermissionRoleController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createPermissionRoleUseCase = container.resolve(
            CreatePermissionRoleUseCase,
        );

        const { id_permission, id_role } = req.body;

        await createPermissionRoleUseCase.execute({ id_permission, id_role });

        return res.status(201).send();
    }
}

export { CreatePermissionRoleController };
