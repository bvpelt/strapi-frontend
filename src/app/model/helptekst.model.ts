import { Base } from './base.model';

export class Helptekst extends Base {
    helpid: string;
    helptekst: string;

    constructor(helpid: string, helptekst: string) {
        super();
        this.helpid = helpid;
        this.helptekst = helptekst;
    }
}
