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

async function findAll(req: Request, res: Response) {
    return res.json({data: await repository.findAll() })
}

async function findOne (req: Request, res: Response) {
    const id = req.params.id
    const category = await repository.findOne({id})
    if(!category){
       return res.status(404).send({ message:"Category not found" })
    }
    res.json({data: category})
}

async function add(req: Request, res: Response) {
    const input = req.body.sanitizeCategoryInput

    const categoryInput = new Category (
        input.name, 
        input.description,)

    const category = await repository.add(categoryInput)
    return res.status(201).send({ message: "Category created", data: category })
}

async function update(req: Request, res: Response) {
    req.body.sanitizeCategoryInput.id = req.params.id
    const category = await repository.update(req.body.sanitizeCategoryInput)

    if(!category){
        return res.status(404).send({ message: "Category not found" })
    }

    return res.status(200).send({ message: "Category updated succesfully" ,data: category })
}

async function remove(req: Request, res: Response) {
    const id = req.params.id
    const category = await repository.delete({id})

    if(!category){
        res.status(404).send({ message: "Category not found" })
    }else {
    res.status(200).send({ message: "Category deleted succesfully" })
    }
}

export {sanitizeCategoryInput, findAll, findOne, add, update, remove}