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
        const { filename } = req.file as IFile;

        const image_name = await uploadProductImageUseCase.execute(filename);

        return res.status(201).json({ image_name });
    }
}

export { UploadProductImageController };
