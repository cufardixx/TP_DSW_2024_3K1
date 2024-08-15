import { Repository } from "../shared/repository.js";
import { Category } from "./category.entity.js";

const categories = [
    new Category(
        'Club Nix',
        "Bienvenidos a Club Nix, el lugar donde la noche explota. Musiquita, luces, y alta energía para romperla hasta que salga el sol. Cluub neeex",
        'a02b91bc-3769-4221-beb1-d7a3aeba7daz'
    ),
]

export class CategoryRepository implements Repository<Category> {

    public findAll(): Category[] | undefined {
        return categories
    }

    public findOne(item: { id: string; }): Category | undefined {
        return categories.find((category) => category.id === item.id)
    }

    public add(item: Category): Category | undefined {
        categories.push(item)
        return item
    }

    public update(item: Category): Category | undefined {
        const categoryIdx = categories.findIndex((category) => category.id === item.id)
    
        if(categoryIdx !== -1){
            categories[categoryIdx] = {...categories[categoryIdx], ...item}
        }
        return categories[categoryIdx]
    }

    public delete(item: { id: string; }): Category | undefined {
        const categoryIdx = categories.findIndex((category) => category.id === item.id)

        if(categoryIdx !== -1){
            const deletedCategories = categories[categoryIdx]
            categories.splice(categoryIdx, 1)
            return deletedCategories
        }

    }
}