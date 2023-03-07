import { Request, Response } from "express";
import { createCategoryService } from "../services/categories/createCategory.service";
import { listAllCategoriesService } from "../services/categories/listAllCategories.service";
import { listCategoryRealEstateService } from "../services/categories/listCategoryRealEstate.service";

export const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
    const categoryData = req.body;

    const newCategory = await createCategoryService(categoryData);

    return res.status(201).json(newCategory);
};

export const listAllCategoriesController = async (req: Request, res: Response): Promise<Response> => {
    const categories = await listAllCategoriesService();

    return res.status(200).json(categories);
};

export const listCategoryRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const categoryId = Number(req.params.id);

    const realEstates = await listCategoryRealEstateService(categoryId);

    return res.status(200).json(realEstates);
};