import { ObjectId } from "mongodb";
import crypto from "node:crypto"

export class Category {
    constructor(
        public name:string, 
        public description:string, 
        public id = crypto.randomUUID(),
        public _id?: ObjectId
    ){}
}