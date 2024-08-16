import { Repository } from "../shared/repository.js";
import { User } from "./user.entity.js";

const users = [
    new User(
        'Tomas Yasparra',
        "tomas@gmail.com",
        "01/05/2001",
        "contrasenia123",
        'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
    ),
]

export class UserRepository implements Repository<User> {

    public async findAll(): Promise<User[] | undefined> {
        return await users
    }

    public async findOne(item: { id: string; }): Promise<User | undefined> {
        return await users.find((user) => user.id === item.id)
    }

    public async add(item: User): Promise<User | undefined> {
        await users.push(item)
        return item
    }

    public async update(item: User): Promise<User | undefined> {
        const userIdx = await users.findIndex((user) => user.id === item.id)
    
        if(userIdx !== -1){
            users[userIdx] = {...users[userIdx], ...item}
        }
        return users[userIdx]
    }

    public async delete(item: { id: string; }): Promise<User | undefined> {
        const userIdx = await users.findIndex((user) => user.id === item.id)

        if(userIdx !== -1){
            const deletedUsers = users[userIdx]
            users.splice(userIdx, 1)
            return deletedUsers
        }

    }
}