import { User } from "generated/prisma";
import { prisma } from "~/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BadRequestException } from "~/globals/middlewares/error.middleware";
import { NextFunction } from "express";
import { IAuthLogin, IAuthRegister } from "~/features/user/interface/auth.interface";
class AuthService {
    public async registerUser(requestData: IAuthRegister) {
        const { name, email, password, avatar } = requestData;
        const hashedPassword: string = await bcrypt.hash(password, 10);
        const newUser: User = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                avatar
            }
        });

        // Create JWT
        const payload = { id: newUser.id, email: newUser.email, avatar: newUser.avatar, role: newUser.role };
        const accessToken: string = this.createJWTToken(payload);
        return { newUser, accessToken };
    }
    public async loginUser(requestData: IAuthLogin, next: NextFunction) {
        const { email, password } = requestData;
        const user: User | null = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        const isMatchPassword = await bcrypt.compare(password, user.password)
        if (user && isMatchPassword) {
            // Create JWT
            const payload = { id: user.id, email: user.email, avatar: user.avatar, role: user.role };
            const accessToken: string = this.createJWTToken(payload);
            return accessToken;
        } else {
            return null;
        }
    }

    // public async getProfile(req: Request, res: Response, next: NextFunction) {
    //     const user = await prisma.user.findUniqueOrThrow({ where: { id: req.user.id } });
    // }

    public isEmailUnique(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }

    private createJWTToken(payload: any): string {
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
        return token;
    }
}
export const authService: AuthService = new AuthService();