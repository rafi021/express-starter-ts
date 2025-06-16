import { Request, Response } from "express";
import { prisma } from "~/prisma";
import { userSchemaCreate } from "../schema/user.schema";
class UserController {
    public async createUser(req: Request, res: Response) {
        const { name, email, password, avatar } = req.body;

        // Insert into DB
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                avatar
            }
        });
        res.status(201).json(newUser);
    }
}

export const userController: UserController = new UserController();