import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRolesUseCase } from './ListRolesUseCase';

class ListRolesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listRolesUseCase = container.resolve(ListRolesUseCase);

        const { id_account } = req.params;

        const roles = await listRolesUseCase.execute({ id_account });

        return res.json(roles);
    }
}

export { ListRolesController };
