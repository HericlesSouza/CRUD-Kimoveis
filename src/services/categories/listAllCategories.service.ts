import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { TReturnAllCategories } from "../../interfaces/categories.interface";
import { returnAllCategoriesSchema } from "../../schemas/categories.schema";

export const listAllCategoriesService = async (): Promise<TReturnAllCategories> => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const categories = await categoryRepository.find();

    return returnAllCategoriesSchema.parse(categories);
};