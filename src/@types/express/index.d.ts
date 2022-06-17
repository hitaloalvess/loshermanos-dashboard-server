declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
        user: {
            id: string;
        };

        paginatedResults: {
            next?: {
                page: number;
                limit: number;
            };
            previous?: {
                page: number;
                limit: number;
            };
            totalPage?: number;
            data?: T;
        };
    }
}
