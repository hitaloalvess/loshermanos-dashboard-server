import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../../../../modules/accounts/repositories/implementations/UsersRepository';
import { AppError } from '../../../errors/AppError';

interface IPayload {
    sub: string;
}

const ensuredAuthenticated = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeaders = req.headers.authorization;

        if (!authHeaders) {
            return new AppError('Token is missing', 401);
        }

        const [, token] = authHeaders.split(' ');

        try {
            const { sub: user_id } = verify(
                token,
                'e51ab2c42f8daf19ebfcee7c5a4c96eb',
            ) as IPayload;

            const usersRepository = new UsersRepository();
            const user = usersRepository.findById(user_id);

            if (!user) {
                return new AppError('User does not exists', 401);
            }

            req.user = {
                id: user_id,
            };

            return next();
        } catch (err) {
            return res.status(401).end();
        }
    };
};

export { ensuredAuthenticated };
