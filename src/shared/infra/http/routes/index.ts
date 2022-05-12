import { Router } from 'express';

import { roulesRoutes } from './roles.routes';

const router = Router();

router.use('/roles', roulesRoutes);

export { router };
