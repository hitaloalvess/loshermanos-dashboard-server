import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const authenticateUserUseCase = container.resolve(
            AuthenticateUserUseCase,
        );

        const { username, password } = req.body;

        const token = await authenticateUserUseCase.execute({
            username,
            password,
        });

        return res.status(201).json(token);
    }
}

export { AuthenticateUserController };
