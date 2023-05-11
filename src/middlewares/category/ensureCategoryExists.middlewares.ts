import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import { Repository } from "typeorm";

const ensureCategoryExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const categoryName: string = req.body.name;
    const categoryRepo: Repository<Category> =
        AppDataSource.getRepository(Category);

    const category: Category | null = await categoryRepo.findOneBy({
        name: categoryName,
    });
    if (category) {
        throw new AppError("Category already exists", 409);
    }

    return next();
};

export { ensureCategoryExists };
