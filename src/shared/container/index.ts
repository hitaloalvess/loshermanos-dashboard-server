import { container } from 'tsyringe';

import { AccountsRepository } from '../../modules/accounts/repositories/implementations/AccountsRepository';
import { PermissionsRepository } from '../../modules/accounts/repositories/implementations/PermissionsRepository';
import { PermissionsRolesRepository } from '../../modules/accounts/repositories/implementations/PermissionsRolesRepository';
import { RolesRepository } from '../../modules/accounts/repositories/implementations/RolesRepository';
import { IPermissionsRepository } from '../../modules/accounts/repositories/IPermissionsRepository';
import { IRolesRepository } from '../../modules/accounts/repositories/IRolesRepository';

container.registerSingleton<IRolesRepository>(
    'RolesRepository',
    RolesRepository,
);

container.registerSingleton<IPermissionsRepository>(
    'PermissionsRepository',
    PermissionsRepository,
);

container.registerSingleton<PermissionsRolesRepository>(
    'PermissionsRolesRepository',
    PermissionsRolesRepository,
);

container.registerSingleton<AccountsRepository>(
    'AccountsRepository',
    AccountsRepository,
);
