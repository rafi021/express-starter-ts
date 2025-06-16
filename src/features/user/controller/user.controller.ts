import { NextFunction, Request, Response } from "express";
import { prisma } from "~/prisma";
import { User } from "generated/prisma";
import { HTTP_STATUS } from "~/globals/constants/http";
import { BadRequestException, InternalServerErrorException } from "~/globals/middlewares/error.middleware";
class UserController {
    public async createUser(req: Request, res: Response, next: NextFunction) {
        const { name, email, password, avatar } = req.body;

        // const isEmailUnqiue =true;
        // if(isEmailUnqiue){
        //     return next(new BadRequestException("Email must be unqiue"));
        // }
        const newUser: User = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    avatar
                }
            });
            res.status(HTTP_STATUS.CREATED).json(newUser);
        
       
    }
}

export const userController: UserController = new UserController();