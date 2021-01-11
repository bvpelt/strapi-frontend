import { StravaUser } from "./stravauser.model";

export class AuthToken {
    jwt: string;
    user: StravaUser;

    constructor(jwt: string, user: StravaUser) {

        this.jwt = jwt;
        this.user = user;
    }
}
