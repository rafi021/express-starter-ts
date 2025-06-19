import express from "express";
import { validateSchema } from "~/globals/middlewares/validate.middleware";
import { userSchemaCreate, userSchemaLogin } from "../schema/user.schema";
import { asyncWrapper } from "~/globals/middlewares/error.middleware";
import authController from "../controller/auth.controller";
import { verifyUser } from '../../../globals/middlewares/auth.middleware';

const authRoute = express.Router();

authRoute.post("/register", validateSchema(userSchemaCreate), asyncWrapper(authController.registerUser));
authRoute.post("/login", validateSchema(userSchemaLogin), asyncWrapper(authController.loginUser));
authRoute.get("/me", verifyUser, asyncWrapper(authController.getProfile));

export default authRoute;