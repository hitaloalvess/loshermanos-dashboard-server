import { Router } from 'express';

import { CreateSaleController } from '../../../../modules/sales/useCases/createSale/CreateSaleController';
import { UpdateSaleController } from '../../../../modules/sales/useCases/updateSale/UpdateSaleController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { is } from '../middlewares/permissions';

const salesRoutes = Router();

const createSaleController = new CreateSaleController();
const updateSaleController = new UpdateSaleController();

salesRoutes.post('/', ensuredAuthenticated, createSaleController.handle);

salesRoutes.put(
    '/:id_sale',
    ensuredAuthenticated,
    is(['admin']),
    updateSaleController.handle,
);

export { salesRoutes };
