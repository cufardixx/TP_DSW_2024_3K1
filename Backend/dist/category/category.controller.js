import { CategoryRepository } from "./category.repository.js";
import { Category } from "./category.entity.js";
const repository = new CategoryRepository();
function sanitizeCategoryInput(req, res, next) {
    req.body.sanitizeCategoryInput = {
        name: req.body.name,
        description: req.body.description,
    };
    Object.keys(req.body.sanitizeCategoryInput).forEach(key => {
        if (req.body.sanitizeCategoryInput[key] === undefined) {
            delete req.body.sanitizeCategoryInput[key];
        }
    });
    next();
}
function findAll(req, res) {
    return res.json({ data: repository.findAll() });
}
function findOne(req, res) {
    const id = req.params.id;
    const category = repository.findOne({ id });
    if (!category) {
        return res.status(404).send({ message: "Category not found" });
    }
    res.json({ data: category });
}
function add(req, res) {
    const input = req.body.sanitizeCategoryInput;
    const categoryInput = new Category(input.name, input.description);
    const category = repository.add(categoryInput);
    return res.status(201).send({ message: "Category created", data: category });
}
function update(req, res) {
    req.body.sanitizeCategoryInput.id = req.params.id;
    const category = repository.update(req.body.sanitizeCategoryInput);
    if (!category) {
        return res.status(404).send({ message: "Category not found" });
    }
    return res.status(200).send({ message: "Category updated succesfully", data: category });
}
function remove(req, res) {
    const id = req.params.id;
    const category = repository.delete({ id });
    if (!category) {
        res.status(404).send({ message: "Category not found" });
    }
    else {
        res.status(200).send({ message: "Category deleted succesfully" });
    }
}
export { sanitizeCategoryInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=category.controller.js.map