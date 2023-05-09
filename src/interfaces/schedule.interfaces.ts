import { z } from "zod";
import { createScheduleSchema } from "../schemas/schedule.schemas";

type TCreateSchedule = z.infer<typeof createScheduleSchema>;

export { TCreateSchedule };
