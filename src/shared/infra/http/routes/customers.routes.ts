import { Router } from 'express';

import { CreateCustomerController } from '../../../../modules/customers/useCases/createCustomer/CreateCustomerController';
import { DeleteCustomerController } from '../../../../modules/customers/useCases/deleteCustomer/DeleteCustomerController';
import { ListAllCustomersController } from '../../../../modules/customers/useCases/listAllCustomers/ListAllCustomersController';
import { UpdateCustomerController } from '../../../../modules/customers/useCases/updateCustomer/UpdateCustomerController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { is } from '../middlewares/permissions';

const customersRoutes = Router();

const createCustomerController = new CreateCustomerController();
const updateCustomerController = new UpdateCustomerController();
const deleteCustomerController = new DeleteCustomerController();
const listAllCustomersController = new ListAllCustomersController();

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

customersRoutes.delete(
    '/:id_customer',
    ensuredAuthenticated,
    is(['admin']),
    deleteCustomerController.handle,
);

customersRoutes.get(
    '/:id_account',
    ensuredAuthenticated,
    listAllCustomersController.handle,
);

export { customersRoutes };
