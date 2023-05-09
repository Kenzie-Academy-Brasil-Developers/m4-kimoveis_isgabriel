import { z } from "zod";
import {
    categorySchema,
    createCategorySchema,
    returnMultipleCategoriesSchema,
} from "../schemas/category.schemas";

type TCategory = z.infer<typeof createCategorySchema>;
type TReturnCategory = z.infer<typeof categorySchema>;
type TListCategories = z.infer<typeof returnMultipleCategoriesSchema>;

export { TCategory, TReturnCategory, TListCategories };
