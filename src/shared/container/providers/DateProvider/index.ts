import { container } from 'tsyringe';

import { DayjsDateProvider } from './implementations/DayjsDateProvider';

container.registerSingleton('DayjsDateProvider', DayjsDateProvider);
