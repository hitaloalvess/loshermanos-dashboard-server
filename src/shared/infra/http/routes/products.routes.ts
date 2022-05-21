import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateProductController } from '../../../../modules/products/useCases/createProduct/CreateProductController';
import { UploadProductImageController } from '../../../../modules/products/useCases/uploadProductImage/uploadProductImageController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { is } from '../middlewares/permissions';

const productsRoutes = Router();
const upload = multer(uploadConfig);

const uploadProductImageController = new UploadProductImageController();
const createProductController = new CreateProductController();

productsRoutes.post(
    '/image',
    ensuredAuthenticated,
    is(['admin']),
    upload.single('image'),
    uploadProductImageController.handle,
);

productsRoutes.post(
    '/:id_account',
    ensuredAuthenticated,
    is(['admin']),
    createProductController.handle,
);

export { productsRoutes };
