import { Router } from 'express';

import { CreateSaleController } from '../../../../modules/sales/useCases/createSale/CreateSaleController';
import { SalePaymentController } from '../../../../modules/sales/useCases/salePayment/SalePaymentController';
import { UpdateSaleController } from '../../../../modules/sales/useCases/updateSale/UpdateSaleController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { is } from '../middlewares/permissions';

const salesRoutes = Router();

const createSaleController = new CreateSaleController();
const updateSaleController = new UpdateSaleController();
const salePaymentController = new SalePaymentController();

salesRoutes.post('/', ensuredAuthenticated, createSaleController.handle);

salesRoutes.put(
    '/:id_sale',
    ensuredAuthenticated,
    is(['admin']),
    updateSaleController.handle,
);

salesRoutes.patch(
    '/payment/:id_sale',
    ensuredAuthenticated,
    salePaymentController.handle,
);

export { salesRoutes };
