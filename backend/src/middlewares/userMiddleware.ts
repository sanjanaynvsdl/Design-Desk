
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';


declare module 'express' {
    interface Request{
        userId?:string | Object;
    }
}

export function userMiddleware(req:Request,res:Response,next:NextFunction) {
    try {

    const secret_key = process.env.JWT_SECRET_KEY;
    const token = req.cookies["admin_token"];
    
    // console.log(token);
    if(!token) {
        res.status(403).json({
            message:"Not Authorized!"
        });
        return;
    }

    if(!secret_key) {
        res.status(500).json({
            message:"Internal server error while getting jwt-secret-key"
        });
        return;
    }

    const verifyToken = jwt.verify(token, secret_key);
    // console.log(verifyToken);

    if(verifyToken && (typeof verifyToken == 'object')) {
        req.userId = verifyToken.userId;
        next();
    } else {
        res.status(500).json({
            message:"Error while verifying token"
        });
        return
    }
    } catch (error) {
        console.log(`Error in user middleware : ${error}`);
        res.status(500).json({
            message:"Internal server error in user middleware",
            error:error
        });
        return;
    }
}