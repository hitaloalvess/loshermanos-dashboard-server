import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createUserUseCase = container.resolve(CreateUserUseCase);

        const {
            name,
            email,
            username,
            password,
            telefone,
            id_account,
            id_role,
        } = req.body;

        const user = await createUserUseCase.execute({
            name,
            email,
            username,
            password,
            telefone,
            id_account,
            id_role,
        });

        return res.status(201).json(user);
    }
}

export { CreateUserController };
