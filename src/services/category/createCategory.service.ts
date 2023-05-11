import { Repository } from "typeorm";
import {
    TCategory,
    TReturnCategory,
} from "../../interfaces/category.interfaces";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { categorySchema } from "../../schemas/category.schemas";

const createCategoryService = async (
    categoryData: TCategory
): Promise<TReturnCategory> => {
    const categoryRepo: Repository<Category> =
        AppDataSource.getRepository(Category);
    const category: Category = categoryRepo.create(categoryData);

    await categoryRepo.save(category);

    const newCategory = categorySchema.parse(category);

    return newCategory;
};

export { createCategoryService };
