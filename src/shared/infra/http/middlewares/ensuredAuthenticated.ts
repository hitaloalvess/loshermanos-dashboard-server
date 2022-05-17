import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../../../../config/auth';
import { UsersRepository } from '../../../../modules/accounts/repositories/implementations/UsersRepository';
import { AppError } from '../../../errors/AppError';

interface IPayload {
    sub: string;
}

export default function ensuredAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        throw new AppError('Token is missing', 401);
    }

    const [, token] = authHeaders.split(' ');

    try {
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User does not exists', 401);
        }

        req.user = {
            id: user_id,
        };

        next();
    } catch (err) {
        throw new AppError('Invalid token', 401);
    }
}

// export { ensuredAuthenticated };
