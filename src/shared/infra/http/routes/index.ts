import { Router } from 'express';

import { accountsRoutes } from './accounts.routes';
import { authenticateRoutes } from './authenticate.routes';
import { productsRoutes } from './products.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use(accountsRoutes);
router.use(authenticateRoutes);
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);

export { router };
