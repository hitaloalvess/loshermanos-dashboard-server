import express, { NextFunction, Request, Response } from 'express';

import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';
import '../../container';
import upload from '../../../config/upload';
import { AppError } from '../../errors/AppError';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.use('/products', express.static(`${upload.tmpFolder}/products`));

app.use(
    (err: Error, _request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: `Internal server error - ${err.message}`,
        });
    },
);

export { app };
