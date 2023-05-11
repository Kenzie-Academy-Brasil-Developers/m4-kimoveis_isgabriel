import { Request, Response } from "express";
import { TCategory } from "../../interfaces/category.interfaces";
import { createCategoryService } from "../../services/category/createCategory.service";
import { getCategoriesListService } from "../../services/category/getAllCategories.service";
import { getRealEstateByCategoryService } from "../../services/category/getRealEstateByCategory.service";

const createCategoryController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const newCategory: TCategory = await createCategoryService(req.body);

    return res.status(201).json(newCategory);
};

const getCategoriesListController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const categoriesList: Array<TCategory> = await getCategoriesListService();

    return res.status(200).json(categoriesList);
};

const getRealEstateByCategoryController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const categoryId: number = Number(req.params.id);
    const realEstate = await getRealEstateByCategoryService(categoryId);

    return res.status(200).json(realEstate);
};

export {
    createCategoryController,
    getCategoriesListController,
    getRealEstateByCategoryController,
};
