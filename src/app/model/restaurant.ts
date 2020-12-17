export class Restaurant {
    name: string;
    description: string;
    categories: number[];

    constructor(name, description, categories) {
        this.name = name;
        this.description = description;
        this.categories = categories;
    }
}