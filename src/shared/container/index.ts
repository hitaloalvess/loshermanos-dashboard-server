import { container } from 'tsyringe';

import { RolesRepository } from '../../modules/accounts/repositories/implementations/RolesRepository';
import { IRolesRepository } from '../../modules/accounts/repositories/IRolesRepository';

container.registerSingleton<IRolesRepository>(
    'RolesRepository',
    RolesRepository,
);
