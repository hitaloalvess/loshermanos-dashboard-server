import { Router } from 'express';

import { permissionsRoutes } from './permissions.routes';
import { roulesRoutes } from './roles.routes';

const router = Router();

router.use('/roles', roulesRoutes);
router.use('/permissions', permissionsRoutes);

export { router };
