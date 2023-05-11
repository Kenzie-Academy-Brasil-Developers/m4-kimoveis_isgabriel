import { Router } from "express";
import { ensureBodyIsValid } from "../middlewares/users/ensureBodyIsValid.middlewares";
import { loginSchema } from "../schemas/user.schemas";
import { loginUserController } from "../controllers/user/user.controllers";

const LoginRoutes: Router = Router();

LoginRoutes.post("", ensureBodyIsValid(loginSchema), loginUserController);

export { LoginRoutes };
