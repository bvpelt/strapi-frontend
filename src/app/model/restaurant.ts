export class Restaurant {
    id: number = null;
    name: string;
    description: string;
    categories: number[];

    constructor(name, description, categories) {
        this.name = name;
        this.description = description;
        this.categories = categories;
    }
}