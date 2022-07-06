import { Router } from 'express';

import { CreateSaleController } from '../../../../modules/sales/useCases/createSale/CreateSaleController';
import { DeleteSaleController } from '../../../../modules/sales/useCases/deleteSale/DeleteSaleController';
import { ListAllSalesController } from '../../../../modules/sales/useCases/listAllSales/ListAllSalesController';
import { ListSaleByIdController } from '../../../../modules/sales/useCases/listSaleById/ListSaleByIdController';
import { SalePaymentController } from '../../../../modules/sales/useCases/salePayment/SalePaymentController';
import { UpdateSaleController } from '../../../../modules/sales/useCases/updateSale/UpdateSaleController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { isAdmin } from '../middlewares/permissions';

const salesRoutes = Router();

const createSaleController = new CreateSaleController();
const updateSaleController = new UpdateSaleController();
const salePaymentController = new SalePaymentController();
const deleteSaleController = new DeleteSaleController();
const listAllSalesController = new ListAllSalesController();
const listSaleByIdController = new ListSaleByIdController();

salesRoutes.post('/', ensuredAuthenticated, createSaleController.handle);

salesRoutes.put(
    '/:id_sale',
    ensuredAuthenticated,
    isAdmin(true),
    updateSaleController.handle,
);

salesRoutes.patch(
    '/payment/:id_sale',
    ensuredAuthenticated,
    salePaymentController.handle,
);

salesRoutes.delete(
    '/:id_sale',
    ensuredAuthenticated,
    isAdmin(true),
    deleteSaleController.handle,
);

salesRoutes.get(
    '/:id_sale',
    ensuredAuthenticated,
    listSaleByIdController.handle,
);
salesRoutes.get(
    '/all/:id_account',
    ensuredAuthenticated,
    listAllSalesController.handle,
);

export { salesRoutes };
