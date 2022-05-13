import { Router } from 'express';

import { accountsRoutes } from './accounts.routes';

const router = Router();

router.use(accountsRoutes);

export { router };
