import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '../../../../modules/accounts/repositories/implementations/UsersRepository';
import { AppError } from '../../../errors/AppError';

function is(roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user;

        const userRepository = new UsersRepository();

        const user = await userRepository.listUserAndRoleAndAccountDataById(id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const roleExists = roles.includes(user.role.name);

        if (!roleExists) {
            throw new AppError('User does not have permission');
        }

        return next();
    };
}

export { is };
