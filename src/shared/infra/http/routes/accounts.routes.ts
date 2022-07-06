import { Router } from 'express';

import { CreateAccountWithAdminUserController } from '../../../../modules/accounts/useCases/createAccountWithAdminUser/CreateAccountWithAdminUserController';

const accountsRoutes = Router();

const createAccountWithAdminUserController =
    new CreateAccountWithAdminUserController();

accountsRoutes.post('/account', createAccountWithAdminUserController.handle);

export { accountsRoutes };
