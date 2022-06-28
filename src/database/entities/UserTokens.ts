import { v4 as uuid } from 'uuid';

import { User } from './User';

class UserTokens {
    id?: string;
    refresh_token!: string;
    expires_date!: Date;
    created_at?: Date;
    id_user!: string;
    user?: User;

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.created_at = new Date();
        }
    }
}

export { UserTokens };
