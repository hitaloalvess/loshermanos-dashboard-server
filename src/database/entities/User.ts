import { v4 as uuid } from 'uuid';

import { Account } from './Account';
import { Role } from './Role';

class User {
    id?: string;
    name!: string;
    email!: string;
    username!: string;
    password!: string;
    telefone!: string;
    created_at?: Date;
    id_account!: string;
    account?: Account;
    id_role!: string;
    role?: Role;

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.created_at = new Date();
        }
    }
}

export { User };
