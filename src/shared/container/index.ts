import { container } from 'tsyringe';

import { PermissionsRepository } from '../../modules/accounts/repositories/implementations/PermissionsRepository';
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
