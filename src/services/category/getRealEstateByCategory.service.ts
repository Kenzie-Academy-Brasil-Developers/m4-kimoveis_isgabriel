import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

const getRealEstateByCategoryService = async (
    categoryId: number
): Promise<Category> => {
    const categoryRepo: Repository<Category> =
        AppDataSource.getRepository(Category);

    const category: Category | null = await categoryRepo.findOne({
        where: {
            id: categoryId,
        },
        relations: {
            realEstate: true,
        },
    });
    if (!category) {
        throw new AppError("Category not found", 404);
    }

    return category;
};

export { getRealEstateByCategoryService };
