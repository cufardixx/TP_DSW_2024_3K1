import { Repository } from "../shared/repository.js";
import { Category } from "./category.entity.js";

const categories = [
    new Category(
        'Boliche',
        'Amplio, barra para tragos, mesa de DJ, baños',
        'a02b91bc-3769-4221-beb1-d7a3aeba7daz'
    ),
]

export class CategoryRepository implements Repository<Category> {

    public async findAll(): Promise<Category[] | undefined> {
        return await categories
    }

    public async findOne(item: { id: string; }): Promise<Category | undefined> {
        return await categories.find((category) => category.id === item.id)
    }

    public async add(item: Category): Promise<Category | undefined> {
        await categories.push(item)
        return item
    }

    public async update(item: Category): Promise<Category | undefined> {
        const categoryIdx = await categories.findIndex((category) => category.id === item.id)
    
        if(categoryIdx !== -1){
            categories[categoryIdx] = {...categories[categoryIdx], ...item}
        }
        return categories[categoryIdx]
    }

    public async delete(item: { id: string; }): Promise<Category | undefined> {
        const categoryIdx = await categories.findIndex((category) => category.id === item.id)

        if(categoryIdx !== -1){
            const deletedCategories = categories[categoryIdx]
            categories.splice(categoryIdx, 1)
            return deletedCategories
        }

    }
}