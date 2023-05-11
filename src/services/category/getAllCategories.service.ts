import { Repository } from "typeorm";
import {
    TCategory,
    TListCategories,
} from "../../interfaces/category.interfaces";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnMultipleCategoriesSchema } from "../../schemas/category.schemas";

const getCategoriesListService = async (): Promise<TListCategories> => {
    const categoryRepo: Repository<Category> =
        AppDataSource.getRepository(Category);

    const getCategories: Array<TCategory> = await categoryRepo.find();

    const categories = returnMultipleCategoriesSchema.parse(getCategories);

    return categories;
};

export { getCategoriesListService };
