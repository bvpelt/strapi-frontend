import { Base } from './base.model';
import { StravaRole } from './stravarole.model';

export class StravaUser extends Base {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: StravaRole;

    constructor(id: number, username: string, email: string,
        provider: string,
        confirmed: boolean,
        blocked: boolean,
        role: StravaRole) {
        super();
        this.id = id;
        this.username = username;
        this.email = email;
        this.provider = provider;
        this.confirmed = confirmed;
        this.blocked = blocked;
        this.role = role;
    }
}
