import { Application } from "express";
import userRoute from "~/features/user/routes/user.route";

const appRoutes = (app: Application) => {
    app.use("/api/users", userRoute);
};

export default appRoutes;