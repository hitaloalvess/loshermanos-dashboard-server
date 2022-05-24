import { Router } from 'express';

import { CreateSaleController } from '../../../../modules/sales/useCases/createSale/CreateSaleController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';

const salesRoutes = Router();

const createSaleController = new CreateSaleController();

salesRoutes.post('/', ensuredAuthenticated, createSaleController.handle);

export { salesRoutes };
