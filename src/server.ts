import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import appRoutes from "./globals/routes/appRoutes";
import { CustomError, NotFoundException } from "./globals/middlewares/error.middleware";
dotenv.config();
class Server {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start(): void {
        this.setupMiddleware();
        this.setupRoutes();
        this.setupGlobalErrorHandler();
        this.startServer();
    }

    private setupMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(helmet());
    }
    private setupRoutes(): void {
        appRoutes(this.app);
    }
    private setupGlobalErrorHandler(): void {
        // Not Found
        this.app.all("*", (req, res, next) => {
            return next( new NotFoundException("Route not found!!!"));
        });

        // Global
        this.app.use((error:any, req:Request, res:Response, next:NextFunction) => {
            if(error instanceof CustomError){
                res.status(error.statusCode).json(error.getErrorResponse())
                return;
            }
            next();
        });
    }

    private startServer() {
        const PORT = parseInt(process.env.PORT!) || 3000;
        this.app.listen(PORT, () => {
            console.log("Server is running on port: " + PORT);
        });
    }
}

export default Server;
