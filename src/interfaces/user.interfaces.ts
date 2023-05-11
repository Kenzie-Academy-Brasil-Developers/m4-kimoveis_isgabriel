import { z } from "zod";
import {
    createUserSchema,
    loginSchema,
    returnMultipleUsersSchema,
    returnUserSchema,
    userSchema,
} from "../schemas/user.schemas";
import { DeepPartial } from "typeorm";

type TUser = z.infer<typeof userSchema>;
type TCreateUser = z.infer<typeof createUserSchema>;
type TReturnCreateUser = z.infer<typeof returnUserSchema>;
type TListUsers = z.infer<typeof returnMultipleUsersSchema>;
type TLogin = z.infer<typeof loginSchema>;
type TUpdateUser = DeepPartial<TCreateUser>;

export {
    TUser,
    TCreateUser,
    TReturnCreateUser,
    TListUsers,
    TLogin,
    TUpdateUser,
};
