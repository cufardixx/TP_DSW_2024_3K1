import { Request, Response, NextFunction} from "express"
import { LocationRepository } from "./location.repository.js"
import { Location } from "./location.entity.js"

const repository = new LocationRepository()

function sanitizeLocationInput(req: Request, res: Response, next: NextFunction) {

    req.body.sanitizeLocationInput = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
        birthdate: req.body.birthdate,
    }

    Object.keys(req.body.sanitizeLocationInput).forEach(key => {
        if(req.body.sanitizeLocationInput[key] === undefined){
        delete req.body.sanitizeLocationInput[key]
        }
    })
    next()
}

function findAll(req: Request, res: Response) {
    return res.json({data: repository.findAll() })
}

function findOne (req: Request, res: Response) {
    const id = req.params.id
    const location = repository.findOne({id})
    if(!location){
       return res.status(404).send({ message:"Location not found" })
    }
    res.json({data: location})
}

function add(req: Request, res: Response) {
    const input = req.body.sanitizeLocationInput

    const locationInput = new Location (
        input.name, 
        input.email, 
        input.pass, 
        input.birthdate)

    const location = repository.add(locationInput)
    return res.status(201).send({ message: "Location created", data: location })
}

function update(req: Request, res: Response) {
    req.body.sanitizeLocationInput.id = req.params.id
    const location = repository.update(req.body.sanitizeLocationInput)

    if(!location){
        return res.status(404).send({ message: "Location not found" })
    }

    return res.status(200).send({ message: "Location updated succesfully" ,data: location })
}

function remove(req: Request, res: Response) {
    const id = req.params.id
    const location = repository.delete({id})

    if(!location){
        res.status(404).send({ message: "Location not found" })
    }else {
    res.status(200).send({ message: "Location deleted succesfully" })
    }
}

export {sanitizeLocationInput, findAll, findOne, add, update, remove}