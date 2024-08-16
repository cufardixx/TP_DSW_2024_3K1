import { Request, Response, NextFunction } from "express";
import { EventoRepository } from "./event.repository.js";
import { evento } from "./event.entity.js";

const repository = new EventoRepository()

function sanitizedEventoInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = { 
        nombre : req.body.nombre,
        cuposGral : req.body.cuposGral,
        descripcion : req.body.descripcion,
        fecha : req.body.fecha,
        hora : req.body.hora,
    };
    //validar

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}

async function findAll(req: Request,res: Response) {
    return res.json({data: await repository.findAll()})
}

async function findOne(req: Request,res: Response) {
    const nuevoEvento = await repository.findOne({id:req.params.id}) 
    if (!nuevoEvento) {
        return res.status(404).send({message: 'evento no encontrado'})
    }
    return res.json({data: nuevoEvento})
}


async function add(req: Request,res: Response) {
    const input = req.body.sanitizedInput

    const nuevoEventoInput = new evento(
        input.idEvento,
        input.nombre, 
        input.cuposGral, 
        input.descripcion, 
        input.fecha, 
        input.hora
    )
    const nuevoEvento = await repository.add(nuevoEventoInput)
    return res.status(201).send({message: 'Evento creado', data: nuevoEvento})
}
    

async function update(req: Request, res: Response){
    req.body.sanitizedInput.idEvento = req.params.id
    const nuevoEvento = await repository.update(req.body.sanitizedInput)
    
    if(!nuevoEvento){
        return res.status(404).send({message: 'evento no encontrado'})
    }
    return res.status(200).send({message:'Evento actualizado correctamente', data: nuevoEvento})
}


async function remove(req: Request,res: Response) {
    const id = req.params.id
    const nuevoEvento = await repository.delete({id})

    if(!nuevoEvento) {
        res.status(404).send({message:'Evento no encontrado'})
    }else {
        res.status(200).send({message: 'Evento borrado satisfactoriamente'})
    }
}


export {sanitizedEventoInput, findAll, findOne, add, update, remove}