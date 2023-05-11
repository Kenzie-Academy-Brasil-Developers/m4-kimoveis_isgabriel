import { Router } from "express";
import {
    createScheduleController,
    getAllSchedulesController,
} from "../controllers/schedule/schedule.controllers";
import { ensureBodyIsValid } from "../middlewares/users/ensureBodyIsValid.middlewares";
import { createScheduleSchema } from "../schemas/schedule.schemas";
import { ensureTokenIsValid } from "../middlewares/users/ensureTokenIsValid.middlewares";
import { ensureUserIsAdmin } from "../middlewares/users/ensureUserIsAdmin.middlewares";

const ScheduleRoutes: Router = Router();

ScheduleRoutes.post(
    "",
    ensureTokenIsValid,
    ensureBodyIsValid(createScheduleSchema),
    createScheduleController
);

ScheduleRoutes.get(
    "/realEstate/:id",
    ensureTokenIsValid,
    ensureUserIsAdmin,
    getAllSchedulesController
);

export { ScheduleRoutes };
