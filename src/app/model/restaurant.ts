import { Category } from './category';

export class Restaurant {
    id: number;
    name: string;
    description: string;
    published_at: Date;
    created_at: Date;
    updated_at: Date;
    categories: Category[];

    constructor(name, description, categories) {
        this.id = null;
        this.name = name;
        this.description = description;
        this.categories = categories;
    }
}