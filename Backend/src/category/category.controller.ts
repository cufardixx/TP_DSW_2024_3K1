import { Request, Response, NextFunction} from "express"
import { CategoryRepository } from "./category.repository.js"
import { Category } from "./category.entity.js"

const repository = new CategoryRepository()

function sanitizeCategoryInput(req: Request, res: Response, next: NextFunction) {

    req.body.sanitizeCategoryInput = {
        name: req.body.name,
        description: req.body.description,
    }

    Object.keys(req.body.sanitizeCategoryInput).forEach(key => {
        if(req.body.sanitizeCategoryInput[key] === undefined){
        delete req.body.sanitizeCategoryInput[key]
        }
    })
    next()
}

function findAll(req: Request, res: Response) {
    return res.json({data: repository.findAll() })
}

function findOne (req: Request, res: Response) {
    const id = req.params.id
    const category = repository.findOne({id})
    if(!category){
       return res.status(404).send({ message:"Category not found" })
    }
    res.json({data: category})
}

function add(req: Request, res: Response) {
    const input = req.body.sanitizeCategoryInput

    const categoryInput = new Category (
        input.name, 
        input.description,)

    const category = repository.add(categoryInput)
    return res.status(201).send({ message: "Category created", data: category })
}

function update(req: Request, res: Response) {
    req.body.sanitizeCategoryInput.id = req.params.id
    const category = repository.update(req.body.sanitizeCategoryInput)

    if(!category){
        return res.status(404).send({ message: "Category not found" })
    }

    return res.status(200).send({ message: "Category updated succesfully" ,data: category })
}

function remove(req: Request, res: Response) {
    const id = req.params.id
    const category = repository.delete({id})

    if(!category){
        res.status(404).send({ message: "Category not found" })
    }else {
    res.status(200).send({ message: "Category deleted succesfully" })
    }
}

export {sanitizeCategoryInput, findAll, findOne, add, update, remove}