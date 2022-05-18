import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        const { id_user } = req.params;

        const { name, email, username, password, telefone, id_role } = req.body;

        const newUser = await updateUserUseCase.execute({
            id_user,
            data: {
                name,
                email,
                username,
                password,
                telefone,
                id_role,
            },
        });

        return res.json(newUser);
    }
}

export { UpdateUserController };
