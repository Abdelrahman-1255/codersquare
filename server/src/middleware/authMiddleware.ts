import { verifyJwt } from "../auth";
import { ExpressHandler } from "../types";
import {db} from "../datastore";

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
       return res.status(401).send({ error: 'Authorization header missing' });
    }
    try{
        const payload = verifyJwt(token);
        const user = await db.getUserById(payload.userId);
        if (!user) {
            return res.status(401).send({ error: 'User not found' });
        }
        res.locals.userId = user.id;
        next();
    }catch(err){
        return res.status(401).send({ error: 'Invalid token' });
    }
}