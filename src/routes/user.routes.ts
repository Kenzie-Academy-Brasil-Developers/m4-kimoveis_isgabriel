import { Router } from "express";
import {
    createUserController,
    deleteuserController,
    getUsersController,
    patchUserController,
} from "../controllers/user/user.controllers";
import { ensureEmailExists } from "../middlewares/users/ensureEmailExists.middlewares";
import { ensureBodyIsValid } from "../middlewares/users/ensureBodyIsValid.middlewares";
import { createUserSchema, updateUserSchema } from "../schemas/user.schemas";
import { ensureTokenIsValid } from "../middlewares/users/ensureTokenIsValid.middlewares";
import { ensureUserIsAdmin } from "../middlewares/users/ensureUserIsAdmin.middlewares";
import { checkUserById } from "../middlewares/users/checkUserById.middlewares";

const UserRoutes: Router = Router();

UserRoutes.post(
    "",
    ensureBodyIsValid(createUserSchema),
    ensureEmailExists,
    createUserController
);

UserRoutes.get("", ensureTokenIsValid, ensureUserIsAdmin, getUsersController);

UserRoutes.patch(
    "/:id",
    checkUserById,
    ensureTokenIsValid,
    ensureUserIsAdmin,
    ensureBodyIsValid(updateUserSchema),
    ensureEmailExists,
    patchUserController
);

UserRoutes.delete(
    "/:id",
    checkUserById,
    ensureTokenIsValid,
    ensureUserIsAdmin,
    deleteuserController
);

export { UserRoutes };
