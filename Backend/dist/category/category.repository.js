import { Category } from "./category.entity.js";
const categories = [
    new Category('Club Nix', "Bienvenidos a Club Nix, el lugar donde la noche explota. Musiquita, luces, y alta energía para romperla hasta que salga el sol. Cluub neeex", 'a02b91bc-3769-4221-beb1-d7a3aeba7daz'),
];
export class CategoryRepository {
    findAll() {
        return categories;
    }
    findOne(item) {
        return categories.find((category) => category.id === item.id);
    }
    add(item) {
        categories.push(item);
        return item;
    }
    update(item) {
        const categoryIdx = categories.findIndex((category) => category.id === item.id);
        if (categoryIdx !== -1) {
            categories[categoryIdx] = { ...categories[categoryIdx], ...item };
        }
        return categories[categoryIdx];
    }
    delete(item) {
        const categoryIdx = categories.findIndex((category) => category.id === item.id);
        if (categoryIdx !== -1) {
            const deletedCategories = categories[categoryIdx];
            categories.splice(categoryIdx, 1);
            return deletedCategories;
        }
    }
}
//# sourceMappingURL=category.repository.js.map