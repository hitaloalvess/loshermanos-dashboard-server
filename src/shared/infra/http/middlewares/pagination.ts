import { NextFunction, Request, Response } from 'express';

import { IPaginationResults } from '../../../../@types';
import { AccountsRepository } from '../../../../modules/accounts/repositories/implementations/AccountsRepository';
import { ProductsRepository } from '../../../../modules/products/repositories/implementations/ProductsRepository';
import { AppError } from '../../../errors/AppError';

interface IPaginationProps {
    entity: 'products';
}

const repositories = {
    products: new ProductsRepository(),
};

export default function pagination({ entity }: IPaginationProps) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const limit = Number(req.query.limit as string);
        const page = Number(req.query.page as string);

        if (!limit && !page) {
            next();
            return;
        }

        const { id_account } = req.params;

        const accountsRepository = new AccountsRepository();

        const accountExists = await accountsRepository.findById(id_account);

        if (!accountExists) {
            next();
            throw new AppError('Account does not exists');
        }

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

            res.paginatedResults = results;

            next();
        } catch (err) {
            throw new AppError(`${err}`, 500);
        }
    };
}
