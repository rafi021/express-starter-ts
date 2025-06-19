import { NextFunction, Request, Response } from "express";
import { UnAuthorizedException } from "./error.middleware";
import jwt from 'jsonwebtoken';

export function verifyUser(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['authorization'] || !req.headers['authorization'].startsWith('Bearer'))
        return next(new UnAuthorizedException("Token is invalid!!"));
    const token = req.headers['authorization'].split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.currentUser = decoded;
    } catch (error) {
        next(new UnAuthorizedException("Token is invalid!!, Please login again!!"));
        return
    }
    next();

}