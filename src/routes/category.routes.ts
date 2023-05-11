import { Router } from "express";
import { ensureTokenIsValid } from "../middlewares/users/ensureTokenIsValid.middlewares";
import { ensureUserIsAdmin } from "../middlewares/users/ensureUserIsAdmin.middlewares";
import { ensureBodyIsValid } from "../middlewares/users/ensureBodyIsValid.middlewares";
import { createCategorySchema } from "../schemas/category.schemas";
import { ensureCategoryExists } from "../middlewares/category/ensureCategoryExists.middlewares";
import {
    createCategoryController,
    getCategoriesListController,
    getRealEstateByCategoryController,
} from "../controllers/category/category.controllers";

const CategoryRoutes: Router = Router();

CategoryRoutes.post(
    "",
    ensureTokenIsValid,
    ensureUserIsAdmin,
    ensureBodyIsValid(createCategorySchema),
    ensureCategoryExists,
    createCategoryController
);

CategoryRoutes.get("", getCategoriesListController);
CategoryRoutes.get("/:id/realEstate", getRealEstateByCategoryController);

export { CategoryRoutes };
