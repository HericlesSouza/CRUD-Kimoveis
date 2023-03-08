import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import { TReturnCategoryRealEstate } from "../../interfaces/categories.interface";

import { returnCategoryRealStateSchema } from "../../schemas/categories.schema";


export const listCategoryRealEstateService = async (categoryId: number): Promise<TReturnCategoryRealEstate> => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const ensureCategoryExists = await categoryRepository.findOne({
        where: {
            id: categoryId

        }
        ,
        relations: {
            realEstate: true
        }
    });

    if (!ensureCategoryExists) {
        throw new AppError("Category not found", 404);
    }

    return returnCategoryRealStateSchema.parse(ensureCategoryExists);
};