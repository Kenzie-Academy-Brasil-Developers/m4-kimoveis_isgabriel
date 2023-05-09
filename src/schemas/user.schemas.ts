import { z } from "zod";

const userSchema = z.object({
    id: z.number().positive().int(),
    nome: z.string().max(45),
    email: z.string().email().max(45),
    admin: z.boolean().default(false),
    password: z.string().max(120),
    createdAt: z.string(),
    updatedAt: z.string().nullish(),
    deletedAt: z.string().nullish(),
});

const createUserSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});

const returnUserSchema = userSchema.omit({
    password: true,
});

const returnMultipleUsersSchema = returnUserSchema.array();

const loginSchema = userSchema.pick({
    email: true,
    password: true,
});

const updateUserSchema = createUserSchema
    .partial({ name: true, email: true, password: true })
    .omit({ admin: true });

export {
    userSchema,
    createUserSchema,
    returnUserSchema,
    returnMultipleUsersSchema,
    loginSchema,
    updateUserSchema,
};
