import { Router } from "express";
import { ensureTokenIsValid } from "../middlewares/users/ensureTokenIsValid.middlewares";
import { ensureBodyIsValid } from "../middlewares/users/ensureBodyIsValid.middlewares";
import { createRealEstateSchema } from "../schemas/realEstate.schemas";
import {
    createRealEstateController,
    getAllRealEstatesController,
} from "../controllers/realEstate/realEstate.controllers";
import { ensureUserIsAdmin } from "../middlewares/users/ensureUserIsAdmin.middlewares";

const RealEstateRoutes: Router = Router();

RealEstateRoutes.post(
    "",
    ensureTokenIsValid,
    ensureUserIsAdmin,
    ensureBodyIsValid(createRealEstateSchema),
    createRealEstateController
);

RealEstateRoutes.get("", getAllRealEstatesController);

export { RealEstateRoutes };
