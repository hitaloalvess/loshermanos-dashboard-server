import { Router } from 'express';

import { CreateRoleController } from '../../../../modules/accounts/useCases/createRole/CreateRoleController';

const roulesRoutes = Router();

const createRoleController = new CreateRoleController();

roulesRoutes.post('/', createRoleController.handle);

export { roulesRoutes };
