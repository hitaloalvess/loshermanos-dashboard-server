import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const deleteUserUseCase = container.resolve(DeleteUserUseCase);

        const { id_user } = req.params;

        const user = await deleteUserUseCase.execute(id_user);

        return res.json(user);
    }
}

export { DeleteUserController };
