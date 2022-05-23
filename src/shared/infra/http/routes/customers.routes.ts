import { Router } from 'express';

import { CreateCustomerController } from '../../../../modules/customers/useCases/createCustomer/CreateCustomerControlle';
import { UpdateCustomerController } from '../../../../modules/customers/useCases/updateCustomer/UpdateCustomerController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { is } from '../middlewares/permissions';

const customersRoutes = Router();

const createCustomerController = new CreateCustomerController();
const updateCustomerController = new UpdateCustomerController();

customersRoutes.post(
    '/',
    ensuredAuthenticated,
    is(['admin']),
    createCustomerController.handle,
);

customersRoutes.put(
    '/:id_customer',
    ensuredAuthenticated,
    is(['admin']),
    updateCustomerController.handle,
);

export { customersRoutes };
