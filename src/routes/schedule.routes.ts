import { Router } from "express";

const ScheduleRoutes: Router = Router();

ScheduleRoutes.post("");

ScheduleRoutes.get("/realEstate/:id");

export { ScheduleRoutes };
