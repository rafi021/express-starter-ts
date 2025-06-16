import express, { Application } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
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
    private setupRoutes(): void { }
    private setupGlobalErrorHandler(): void { }

    private startServer() {
        const PORT = parseInt(process.env.PORT!) || 3000;
        this.app.listen(PORT, () => {
            console.log("Server is running on port: " + PORT);
        });
    }
}

export default Server;
