import { Router } from 'express';

import { accountsRoutes } from './accounts.routes';
import { authenticateRoutes } from './authenticate.routes';
import { customersRoutes } from './customers.routes';
import { productsRoutes } from './products.routes';
import { salesRoutes } from './sales.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use(authenticateRoutes);
router.use(accountsRoutes);
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/customers', customersRoutes);
router.use('/sales', salesRoutes);

export { router };
