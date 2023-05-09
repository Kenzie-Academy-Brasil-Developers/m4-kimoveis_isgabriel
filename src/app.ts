import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { LoginRoutes } from "./routes/login.routes";
import { UserRoutes } from "./routes/user.routes";
import { CategoryRoutes } from "./routes/category.routes";
import { RealEstateRoutes } from "./routes/realEstate.routes";
import { ScheduleRoutes } from "./routes/schedule.routes";

const app: Application = express();
app.use(express.json());
app.use("/login", LoginRoutes);
app.use("/users", UserRoutes);
app.use("/categories", CategoryRoutes);
app.use("/realEstate", RealEstateRoutes);
app.use("/schedules", ScheduleRoutes);

app.use(handleErrors);

export default app;
