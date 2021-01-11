import { DatePipe } from '@angular/common';

export class Base {
    id: number;
    published_at: Date;
    created_at: Date;
    updated_at: Date;

    constructor() {
        const now: Date = new Date();
        this.id = 0;
        this.published_at = now;
        this.created_at = now;
        this.updated_at = now;
    }
}
