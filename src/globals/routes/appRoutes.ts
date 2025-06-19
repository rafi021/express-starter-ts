import { Application } from "express";
import authRoute from "~/features/user/routes/auth.route";
import userRoute from "~/features/user/routes/user.route";

const appRoutes = (app: Application) => {
    app.use("/api/users", userRoute);
    app.use("/api/auth", authRoute);
};

export default appRoutes;