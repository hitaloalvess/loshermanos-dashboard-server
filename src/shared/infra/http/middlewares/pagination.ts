import { NextFunction, Request, Response } from 'express';

import { IPaginationResults } from '../../../../@types';
import { ProductsRepository } from '../../../../modules/products/repositories/implementations/ProductsRepository';
import { AppError } from '../../../errors/AppError';

interface IPaginationProps {
    entity: 'products';
}

const repositories = {
    products: new ProductsRepository(),
};

function pagination({ entity }: IPaginationProps) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const limit = Number(req.query.limit as string);
        const page = Number(req.query.page as string);

        if (!limit && !page) {
            next();
        }

        if (page <= 0) {
            throw new AppError('Page value must not be less than 1', 401);
        }

        const { id_account } = req.params;

        const repository = repositories[entity];

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const registersTotal = await repository.findAll({ id_account });
        const totalPage = Math.ceil(registersTotal.length / limit);

        const results: IPaginationResults<typeof registersTotal> = {};
        results.totalPage = totalPage;

        if (endIndex < registersTotal.length) {
            results.next = {
                page: page + 1,
                limit,
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit,
            };
        }

        try {
            results.data = await repository.findAll({
                id_account,
                page: startIndex,
                limit,
            });

            req.paginatedResults = results;

            next();
        } catch (err) {
            throw new AppError(`${err}`, 500);
        }
    };
}

export { pagination };
