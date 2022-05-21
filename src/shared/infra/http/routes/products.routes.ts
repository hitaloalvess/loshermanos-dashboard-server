import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateProductController } from '../../../../modules/products/useCases/createProduct/CreateProductController';
import { UpdateProductController } from '../../../../modules/products/useCases/updateProduct/UpdateProductController';
import { UploadProductImageController } from '../../../../modules/products/useCases/uploadProductImage/uploadProductImageController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { is } from '../middlewares/permissions';

const productsRoutes = Router();
const upload = multer(uploadConfig);

const uploadProductImageController = new UploadProductImageController();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();

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

productsRoutes.put(
    '/:id_product',
    ensuredAuthenticated,
    is(['admin']),
    updateProductController.handle,
);

export { productsRoutes };
