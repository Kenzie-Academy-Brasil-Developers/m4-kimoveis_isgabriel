import { Router } from "express";
import { createScheduleController } from "../controllers/schedule/schedule.controllers";
import { ensureBodyIsValid } from "../middlewares/users/ensureBodyIsValid.middlewares";
import { createScheduleSchema } from "../schemas/schedule.schemas";
import { ensureTokenIsValid } from "../middlewares/users/ensureTokenIsValid.middlewares";

const ScheduleRoutes: Router = Router();

ScheduleRoutes.post(
    "",
    ensureTokenIsValid,
    ensureBodyIsValid(createScheduleSchema),
    createScheduleController
);

ScheduleRoutes.get("/realEstate/:id");

export { ScheduleRoutes };
