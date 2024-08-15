import crypto from "node:crypto"

export class Location {
    constructor(
        public name:string, 
        public address:string, 
        public capacity: string, 
        public description: string,
        public id = crypto.randomUUID()
    ){}
}