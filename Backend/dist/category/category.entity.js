import crypto from "node:crypto";
export class Category {
    constructor(name, description, id = crypto.randomUUID()) {
        this.name = name;
        this.description = description;
        this.id = id;
    }
}
//# sourceMappingURL=category.entity.js.map