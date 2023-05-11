import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";

const ensureCategoryExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const categoryName: string = req.body.name;
    const categoryRepo = AppDataSource.getRepository(Category);

    const category = await categoryRepo.findOneBy({
        name: categoryName,
    });
    if (category) {
        throw new AppError("Category already exists", 409);
    }

    return next();
};

export { ensureCategoryExists };
