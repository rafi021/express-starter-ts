import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { BadRequestException } from "~/globals/middlewares/error.middleware";
import { authService } from "~/services/db/auth.service";

class AuthController {
    public async registerUser(req: Request, res: Response, next: NextFunction) {
        if (await authService.isEmailUnique(req.body.email)) {
            next(new BadRequestException("Email must be unqiue"));
            return;
        };
        const { newUser, accessToken } = await authService.registerUser(req.body);
        res.status(HTTP_STATUS.CREATED).json({
            message: "User registered successfully",
            accessToken
        });
    }
    public async loginUser(req: Request, res: Response, next: NextFunction) {
        const accessToken = await authService.loginUser(req.body, next);
        if (accessToken == null) {
            next(new BadRequestException("Invalid email or password"));
            return;
        }
        res.status(HTTP_STATUS.OK).json({
            message: "User logged in successfully",
            accessToken
        });
    }

    public async getProfile(req: Request, res: Response, next: NextFunction) {
        const user = await authService.getProfile(req);
        res.status(HTTP_STATUS.OK).json(user);
    }
}

const authController: AuthController = new AuthController();
export default authController