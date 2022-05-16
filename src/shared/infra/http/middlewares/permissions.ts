import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '../../../../modules/accounts/repositories/implementations/UsersRepository';

function is(role: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user;

        const userRepository = new UsersRepository();

        const user = await userRepository.listUserAndRoleAndAccountDataById(id);

        if (!user) {
            return res.status(400).json('User does not exists');
        }

        const roleExists = user.role.name === role;

        if (!roleExists) {
            return res.status(400).end();
        }

        return next();
    };
}

export { is };
