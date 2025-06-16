import { Request, Response } from "express";
import { prisma } from "~/prisma";
import { HTTP_STATUS } from "~/globals/constants/Http";
import { User } from "generated/prisma";
class UserController {
    public async createUser(req: Request, res: Response) {
        const { name, email, password, avatar } = req.body;

        // Insert into DB
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