import { Router } from 'express';

import { ListUsersLinkedToAccountController } from '../../../../modules/accounts/useCases/listUsersLinkedToAccount/ListUsersLinkedToAccountController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { is } from '../middlewares/permissions';

const usersRoutes = Router();

const listUsersLinkedToAccountController =
    new ListUsersLinkedToAccountController();

usersRoutes.get(
    '/:id_account',
    ensuredAuthenticated,
    is('admin'),
    listUsersLinkedToAccountController.handle,
);

export { usersRoutes };
