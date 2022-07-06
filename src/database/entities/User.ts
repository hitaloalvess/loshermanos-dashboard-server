import { v4 as uuid } from 'uuid';

import { Account } from './Account';

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

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.created_at = new Date();
        }
    }
}

export { User };
