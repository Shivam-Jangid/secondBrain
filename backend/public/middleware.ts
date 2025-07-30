import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import { JWT_PASS } from './config';
import dotenv from "dotenv";
dotenv.config();
let JWT_PASS = process.env.JWT_PASS || "SHcdbjbcksdckc";
interface areq extends Request {
    userId?:string
}
interface jwtPay extends JwtPayload {
    id:string
}

export const userMiddleWare = (req:areq, res:Response,next:NextFunction)=>{
    const header = req.headers['authorization'];
    if (!header) {
        return res.status(401).json({ msg: "Authorization header missing or malformed" });
    }

    const decoded = jwt.verify(header as string, JWT_PASS) as jwtPay;
    if (decoded){
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json("You are not logged in")
    }
}