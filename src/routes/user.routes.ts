import { Router } from "express";
import { createUserController } from "../controllers/user/user.controllers";
import { ensureEmailExists } from "../middlewares/users/ensureEmailExists.middlewares";
import { ensureBodyIsValid } from "../middlewares/users/ensureBodyIsValid.middlewares";
import { createUserSchema } from "../schemas/user.schemas";

const UserRoutes: Router = Router();

UserRoutes.post(
    "",
    ensureBodyIsValid(createUserSchema),
    ensureEmailExists,
    createUserController
);

UserRoutes.get("");

UserRoutes.patch("/:id");

UserRoutes.delete("/:id");

export { UserRoutes };
