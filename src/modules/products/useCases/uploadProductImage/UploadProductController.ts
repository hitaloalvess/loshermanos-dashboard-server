import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadProductImageUseCase } from './UploadProductImageUseCase';

interface IFile {
    filename: string;
}

class UploadProductImageController {
    async handle(req: Request, res: Response): Promise<Response> {
        const uploadProductImageUseCase = container.resolve(
            UploadProductImageUseCase,
        );

        const { id_product } = req.params;
        const image = req.file as IFile;

        await uploadProductImageUseCase.execute({
            id_product,
            image_name: image.filename,
        });

        return res.status(201).send();
    }
}

export { UploadProductImageController };
