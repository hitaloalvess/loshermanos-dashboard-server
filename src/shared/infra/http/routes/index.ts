import { Router } from 'express';

import { accountsRoutes } from './accounts.routes';
import { authenticateRoutes } from './authenticate.routes';

const router = Router();

router.use(accountsRoutes);
router.use(authenticateRoutes);

export { router };
