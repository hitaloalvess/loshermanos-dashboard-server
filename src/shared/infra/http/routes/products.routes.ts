import { Router } from 'express';

import { CreateProductController } from '../../../../modules/products/useCases/createProduct/CreateProductController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { is } from '../middlewares/permissions';

const productsRoutes = Router();

const createProductController = new CreateProductController();

productsRoutes.post(
    '/:id_account',
    ensuredAuthenticated,
    is(['admin']),
    createProductController.handle,
);

export { productsRoutes };
