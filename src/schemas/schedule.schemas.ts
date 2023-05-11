import { z } from "zod";
import { realEstateSchema } from "./realEstate.schemas";
import { userSchema } from "./user.schemas";

const scheduleSchema = z.object({
    id: z.number().int().positive(),
    date: z
        .string()
        .regex(/^\d{4}[-\/]\d{2}[-\/]\d{2}$/)
        .transform((val) => val.replace("-", "/")),
    hour: z.string().regex(/^\d{2}:\d{2}$/),
    realEstate: realEstateSchema,
    user: userSchema,
});

const createScheduleSchema = scheduleSchema
    .omit({
        id: true,
        realEstate: true,
        user: true,
    })
    .extend({
        realEstateId: z.number().int().positive(),
    });

export { scheduleSchema, createScheduleSchema };
