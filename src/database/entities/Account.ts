import { v4 as uuid } from 'uuid';

class Account {
    id?: string;
    name_stablishment!: string;
    created_at?: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.created_at = new Date();
        }
    }
}

export { Account };
