import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAccountWithAdminUserUseCase } from './CreateAccountWithAdminUserUseCase';

class CreateAccountWithAdminUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createAccountWithAdminUserUseCase = container.resolve(
            CreateAccountWithAdminUserUseCase,
        );

        const { name, email, username, password, telefone, name_stablishment } =
            req.body;

        const accountWithUser = await createAccountWithAdminUserUseCase.execute(
            {
                name,
                email,
                username,
                password,
                telefone,
                name_stablishment,
            },
        );

        return res.status(201).json(accountWithUser);
    }
}

export { CreateAccountWithAdminUserController };
