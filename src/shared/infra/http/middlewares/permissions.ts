import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '../../../../modules/accounts/repositories/implementations/UsersRepository';
import { AppError } from '../../../errors/AppError';

function isAdmin(isAdmin: boolean) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user;

        const userRepository = new UsersRepository();

        const user = await userRepository.listUserAndAccountDataById(id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const allowedUser = isAdmin === user.admin;

        if (!allowedUser) {
            throw new AppError('User does not have permission');
        }

        return next();
    };
}

export { isAdmin };
