import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUsersLinkedToAccountUseCase } from './ListUsersLinkedToAccountUseCase';

class ListUsersLinkedToAccountController {
    async handle(req: Request, res: Response): Promise<Response> {
        console.log('Dentro do controller');
        const listUsersLinkedToAccountUseCase = container.resolve(
            ListUsersLinkedToAccountUseCase,
        );

        const { id_account } = req.params;

        const users = await listUsersLinkedToAccountUseCase.execute({
            id_account,
        });

        return res.json(users);
    }
}

export { ListUsersLinkedToAccountController };
