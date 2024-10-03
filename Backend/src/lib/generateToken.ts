import jwt from 'jsonwebtoken'
import { User } from "../user/user.entity";


export const verifyToken = async(token : string) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY!)
    } catch (error) {
        return null
    }
};


export const tokenSing = async (user: User) => {
    return jwt.sign(
        {
            id: user.id,
            rol: user.rol
        },
        process.env.SECRET_KEY!,
        
    );
}